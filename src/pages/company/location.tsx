import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, type Transition } from "framer-motion";
import Head from "next/head";

import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import BreadcrumbSection from "@/components/BreadcrumbSection";
import { useLangStore } from "@/stores/langStore";

const kakaoMapConfigs: {
  [key: string]: {
    latitude: number;
    longitude: number;
    level?: number;
    address: string;
  };
} = {
  본사: {
    latitude: 36.439533,
    longitude: 127.394547,
    level: 3,
    address: "대전광역시 대덕구 문평동 43-10",
  },
  천안사업장: {
    latitude: 36.848807,
    longitude: 127.122367,
    level: 3,
    address: "충청남도 천안시 서북구 성성동 336-4 G1비즈캠퍼스 4F 401호",
  },
  시험센터: {
    latitude: 36.414282,
    longitude: 127.413725,
    level: 3,
    address: "대전광역시 유성구 테크노2로 187 B동 120호",
  },
};

const locationsData = [
  {
    key: "본사",
    title: {
      KOR: "본사",
      ENG: "Head Office",
    },
    addressSnippet: {
      KOR: "대전광역시 대덕구 문평서로 17번길 105(문평동)",
      ENG: "M105, Munpyeongseo-ro 17beon-gil, Daedeok-gu, Daejeon, Republic of Korea",
    },
  },
  {
    key: "천안사업장",
    title: {
      KOR: "천안사업장",
      ENG: "Cheonan Place of Business",
    },
    addressSnippet: {
      KOR: "충남 천안시 서북구 2공단4로 40-11(성성동) G1 비즈캠퍼스 4F 401호",
      ENG: "40-11, 2gongdan 4-ro, Seobuk-gu, Cheonan-si, Chungcheongnam-do, Republic of Korea",
    },
  },
  {
    key: "시험센터",
    title: {
      KOR: "시험센터",
      ENG: "Testing Center",
    },
    addressSnippet: {
      KOR: "대전광역시 유성구 테크노 2로 309-26(탑립동 929-1)",
      ENG: "309-26, Techno 2-ro, Yuseong-gu, Daejeon, Republic of Korea",
    },
  },
];

export default function LocationPage() {
  const lang = useLangStore((state) => state.lang);
  const [openMap, setOpenMap] = useState<string | null>(null);
  const mapRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const kakaoMaps = useRef<{ [key: string]: kakao.maps.Map | null }>({});
  const infoWindows = useRef<{ [key: string]: kakao.maps.InfoWindow | null }>(
    {}
  );
  const currentOpenInfowindow = useRef<kakao.maps.InfoWindow | null>(null);

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" } as Transition,
    },
  };

  const mapTransition = useMemo(
    () =>
      ({
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.5,
      } as Transition),
    []
  );
  const CM_TO_PX = 37.8;                       // UPDATED
  const HERO_TRIM_PX = Math.round(CM_TO_PX);  

  const KAKAO_MAP_APP_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY;

  const initKakaoMap = useCallback((locationKey: string) => {
    const config = kakaoMapConfigs[locationKey];
    const container = mapRefs.current[locationKey];

    if (kakaoMaps.current[locationKey]) return;

    if (config && container && window.kakao && window.kakao.maps) {
      const options: kakao.maps.MapOptions = {
        center: new window.kakao.maps.LatLng(config.latitude, config.longitude),
        level: config.level,
      };
      const map = new window.kakao.maps.Map(container, options);
      kakaoMaps.current[locationKey] = map;

      const zoomControl = new window.kakao.maps.ZoomControl();
      map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(
          config.latitude,
          config.longitude
        ),
        map,
      });

      const infowindow = new window.kakao.maps.InfoWindow({
        content: `<div style="padding:10px;font-size:14px;font-weight:bold;color:#333;">
                    <div style="margin-bottom:5px;">${locationKey}</div>
                    <div style="font-size:12px;color:#666;">${config.address}</div>
                  </div>`,
        removable: true,
      });

      infoWindows.current[locationKey] = infowindow;

      window.kakao.maps.event.addListener(marker, "click", () => {
        if (currentOpenInfowindow.current) {
          currentOpenInfowindow.current.close();
        }
        infowindow.open(map, marker);
        currentOpenInfowindow.current = infowindow;
      });

      window.kakao.maps.event.addListener(map, "click", () => {
        if (currentOpenInfowindow.current) {
          currentOpenInfowindow.current.close();
          currentOpenInfowindow.current = null;
        }
      });
    }
  }, []);

  const handleToggleMap = useCallback(
    (location: string) => {
      setOpenMap((prevOpenMap) => {
        const nextOpenMap = prevOpenMap === location ? null : location;

        if (!nextOpenMap && currentOpenInfowindow.current) {
          currentOpenInfowindow.current.close();
          currentOpenInfowindow.current = null;
        }

        if (nextOpenMap && kakaoMaps.current[nextOpenMap]) {
          setTimeout(() => {
            kakaoMaps.current[nextOpenMap]?.relayout();
            const config = kakaoMapConfigs[nextOpenMap];
            kakaoMaps.current[nextOpenMap]?.setCenter(
              new window.kakao.maps.LatLng(config.latitude, config.longitude)
            );
          }, (mapTransition.duration ?? 0.5) * 1000 + 50);
        }

        return nextOpenMap;
      });
    },
    [mapTransition]
  );

  useEffect(() => {
    if (
      KAKAO_MAP_APP_KEY &&
      typeof window !== "undefined" &&
      !window.kakao?.maps
    ) {
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_APP_KEY}&libraries=services&autoload=false`;
      script.async = true;
      script.onload = () => {
        window.kakao.maps.load(() => {
          Object.keys(kakaoMapConfigs).forEach(initKakaoMap);
        });
      };
      document.head.appendChild(script);
    } else if (window.kakao?.maps) {
      Object.keys(kakaoMapConfigs).forEach(initKakaoMap);
    }
  }, [KAKAO_MAP_APP_KEY, initKakaoMap]);

  return (
    <>
    <Layout>
      <Head>
        <title>
          {lang === "KOR" ? "오시는길" : "Directions"}
        </title>
      </Head>

      <main className="min-h-screen bg-white text-slate-900" style={{ paddingTop: "90px" }}>
        {/* === UPDATED: Bungkus HeroSection dengan negative margin top/bottom (1cm per sisi) === */}
        <div                                       // UPDATED
          style={{                                 // UPDATED
            marginTop: `-${HERO_TRIM_PX}px`,       // UPDATED
            marginBottom: `-${HERO_TRIM_PX}px`,    // UPDATED
          }}                                       // UPDATED
        >
        <HeroSection
          title={lang === "KOR" ? "오시는 길" : "Directions"}
          //subtitle={lang === "KOR" ? "Locations" : "How to Reach Us"}
          backgroundImage="/images/sub_banner/company_banner.png"
        />
        </div>

        <div className="relative z-30 -mt-2">  
        <BreadcrumbSection
          path={
            lang === "KOR"
              ? "회사소개 > Directions"
              : "Company > Location / Directions"
          }
        /> </div>

        <div className="content-wrapper py-20 px-4 md:px-8 bg-white text-black">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInVariants}
            >
              <h2 className="text-3xl font-bold mb-8">
                {lang === "KOR" ? (
                  <span className="text-black font-bold">오시는 길</span>
                ) : (
                  <>
                    <span className="text-black font-bold">Directions to </span>
                    <span className="text-blue-600 font-bold">SUMAN</span>
                  </>
                )}
              </h2>

              <div className="space-y-0 border-t-2 border-gray-900">
                {locationsData.map((location) => (
                  <div
                    key={location.key}
                    className="p-6 border-b border-gray-300"
                  >
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => handleToggleMap(location.key)}
                    >
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          {location.title[lang]}
                        </h3>
                        <p className="text-gray-700">
                          {location.addressSnippet[lang]}
                        </p>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className={`w-8 h-8 text-blue-600 transition-transform duration-300 ${
                          openMap === location.key ? "" : "rotate-180"
                        }`}
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.47 4.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1-1.06 1.06L12 6.56l-2.69 2.69a.75.75 0 0 1-1.06-1.06l3.75-3.75Z"
                          clipRule="evenodd"
                        />
                        <path
                          fillRule="evenodd"
                          d="M11.47 11.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 1 1-1.06 1.06L12 13.56l-2.69 2.69a.75.75 0 0 1-1.06-1.06l3.75-3.75Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>

                    <motion.div
                      initial={false}
                      animate={{
                        height: openMap === location.key ? "250px" : "0px",
                        opacity: openMap === location.key ? 1 : 0,
                      }}
                      transition={mapTransition}
                      className="mt-4 overflow-hidden relative"
                    >
                      <div
                        ref={(el) => {
                          mapRefs.current[location.key] = el;
                        }}
                        className="w-full h-full absolute top-0 left-0"
                        style={{ backgroundColor: "lightgray" }}
                      >
                        {openMap !== location.key && (
                          <div
                            className="absolute inset-0 z-10"
                            style={{ pointerEvents: "auto" }}
                          />
                        )}
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
        <hr className="my-8 border-gray-200 w-full" />
        </main>
      </Layout>
    </>
  );
}
