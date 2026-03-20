import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, type Transition } from "framer-motion";
import Head from "next/head";

import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import BreadcrumbSection from "@/components/BreadcrumbSection";
import { GetStaticProps } from "next";
import {
  locationPage,
  locationPageContent
} from "@/lib/strapi/company/locationPage";


export const getStaticProps: GetStaticProps = async () => {
  const content = await locationPage.find({
    locale: "ko-KR",
    populate: ["pageInfo", "section1", "section1.locations"]
  });
  return {
    props: { content: content?.data }
  };
};

export default function LocationPage({
  content
}: {
  content: locationPageContent;
}) {
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
      transition: { duration: 0.8, ease: "easeOut" } as Transition
    }
  };

  const mapTransition = useMemo(
    () =>
      ({
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.5
      } as Transition),
    []
  );

  const KAKAO_MAP_APP_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY;

  const initKakaoMap = useCallback(
    (location: {
      name: string;
      address: string;
      latitude: number;
      longitude: number;
    }) => {
      const container = mapRefs.current[location.name];

      if (kakaoMaps.current[location.name]) return;

      if (location && container && window.kakao && window.kakao.maps) {
        const options: kakao.maps.MapOptions = {
          center: new window.kakao.maps.LatLng(
            location.latitude,
            location.longitude
          ),
          level: 3
        };
        const map = new window.kakao.maps.Map(container, options);
        kakaoMaps.current[location.name] = map;

        const zoomControl = new window.kakao.maps.ZoomControl();
        map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(
            location.latitude,
            location.longitude
          ),
          map
        });

        const infowindow = new window.kakao.maps.InfoWindow({
          content: `<div style="padding:10px;font-size:14px;font-weight:bold;color:#333;">
                    <div style="margin-bottom:5px;">${location.name}</div>
                    <div style="font-size:12px;color:#666;">${location.address}</div>
                  </div>`,
          removable: true
        });

        infoWindows.current[location.name] = infowindow;

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
    },
    []
  );

  const handleToggleMap = useCallback(
    (location: { name: string; latitude: number; longitude: number }) => {
      setOpenMap((prevOpenMap) => {
        const nextOpenMap =
          prevOpenMap === location.name ? null : location.name;

        if (!nextOpenMap && currentOpenInfowindow.current) {
          currentOpenInfowindow.current.close();
          currentOpenInfowindow.current = null;
        }

        if (nextOpenMap && kakaoMaps.current[nextOpenMap]) {
          setTimeout(() => {
            kakaoMaps.current[nextOpenMap]?.relayout();
            kakaoMaps.current[nextOpenMap]?.setCenter(
              new window.kakao.maps.LatLng(
                location.latitude,
                location.longitude
              )
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
          content.section1?.locations?.forEach(initKakaoMap);
        });
      };
      document.head.appendChild(script);
    } else if (window.kakao?.maps) {
      content.section1?.locations?.forEach(initKakaoMap);
    }
  }, [KAKAO_MAP_APP_KEY, content.section1?.locations, initKakaoMap]);

  return (
    <Layout>
      <Head>
        <title>{content.pageInfo?.title || "오시는길"}</title>
      </Head>

      <main className="min-h-screen bg-white pt-[90px] text-slate-900">
        <HeroSection
          title={content.pageInfo?.title || "오시는 길"}
          backgroundImage={
            content.pageInfo?.hero || "/images/sub_banner/company_banner.png"
          }
        />

        <div className="relative z-30 -mt-8 sm:-mt-10">
          <BreadcrumbSection
            path={content.pageInfo?.pageLocation || "회사소개 > Directions"}
          />
        </div>

        <div className="content-wrapper py-20 px-4 md:px-8 bg-white text-black">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInVariants}
            >
              <h2 className="text-3xl font-bold mb-8">
                {content.section1?.title || "오시는 길"}
              </h2>

              <div className="space-y-0 border-t-2 border-gray-900">
                {content.section1?.locations?.map((location) => (
                  <div
                    key={location.name}
                    className="p-6 border-b border-gray-300"
                  >
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => handleToggleMap(location)}
                    >
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          {location.name}
                        </h3>
                        <p className="text-gray-700">{location.address}</p>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className={`w-8 h-8 text-blue-600 transition-transform duration-300 ${
                          openMap === location.name ? "" : "rotate-180"
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
                        height: openMap === location.name ? "250px" : "0px",
                        opacity: openMap === location.name ? 1 : 0
                      }}
                      transition={mapTransition}
                      className="mt-4 overflow-hidden relative"
                    >
                      <div
                        ref={(el) => {
                          mapRefs.current[location.name] = el;
                        }}
                        className="w-full h-full absolute top-0 left-0"
                        style={{ backgroundColor: "lightgray" }}
                      >
                        {openMap !== location.name && (
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
  );
}
