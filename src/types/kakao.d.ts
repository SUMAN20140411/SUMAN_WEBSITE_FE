// src/types/kakao.d.ts

// Kakao Maps API의 핵심 객체들에 대한 타입 정의
declare namespace kakao.maps {
  // LatLng: 위도, 경도 좌표를 표현하는 객체
  class LatLng {
    constructor(lat: number, lng: number);
    getLat(): number;
    getLng(): number;
    equals(other: LatLng): boolean;
    toString(): string;
  }

  // Map: 지도 객체
  class Map {
    constructor(container: HTMLElement, options?: MapOptions);
    setCenter(latlng: LatLng): void;
    getCenter(): LatLng;
    setLevel(
      level: number,
      options?: { animate?: boolean; around?: LatLng },
    ): void;
    getLevel(): number;
    setMapTypeId(mapTypeId: MapTypeId): void;
    getMapTypeId(): MapTypeId;
    setBounds(
      bounds: LatLngBounds,
      paddingTopBottom?: number,
      paddingLeftRight?: number,
    ): void;
    getBounds(): LatLngBounds;
    relayout(): void; // 지도의 크기가 변경되었을 때 호출하여 지도를 다시 그리는 메서드
    addControl(control: Control, position: ControlPosition): void;
    removeControl(control: Control): void;
    setDraggable(draggable: boolean): void;
    getDraggable(): boolean;
    setZoomable(zoomable: boolean): void;
    getZoomable(): boolean;
    panBy(dx: number, dy: number): void;
    panTo(latlng: LatLng): void;
  }

  // MapOptions: 지도 생성 시 옵션
  interface MapOptions {
    center: LatLng;
    level?: number;
    mapTypeId?: MapTypeId;
    draggable?: boolean;
    scrollwheel?: boolean;
    disableDoubleClick?: boolean;
    disableDoubleClickZoom?: boolean;
  }

  // Marker: 마커 객체
  class Marker {
    constructor(options?: MarkerOptions);
    setMap(map: Map | null): void;
    getMap(): Map | null;
    setPosition(position: LatLng): void;
    getPosition(): LatLng;
  }

  // MarkerOptions: 마커 생성 시 옵션
  interface MarkerOptions {
    position: LatLng;
    map?: Map;
    image?: MarkerImage;
    clickable?: boolean;
    zIndex?: number;
    opacity?: number;
  }

  // MarkerImage: 마커 이미지 옵션
  class MarkerImage {
    constructor(src: string, size: Size, options?: MarkerImageOptions);
  }

  interface MarkerImageOptions {
    alt?: string;
    coords?: string;
    offset?: Point;
    spriteSize?: Size;
    spriteOrigin?: Point;
  }

  // InfoWindow: 정보창 객체
  class InfoWindow {
    constructor(options?: InfoWindowOptions);
    open(map: Map, marker?: Marker): void;
    close(): void;
    setContent(content: HTMLElement | string): void;
    setPosition(position: LatLng): void;
    setZIndex(zIndex: number): void;
    getMap(): Map | null;
    getPosition(): LatLng;
    getContent(): string | HTMLElement;
    getZIndex(): number;
  }

  // InfoWindowOptions: 정보창 생성 시 옵션
  interface InfoWindowOptions {
    content: HTMLElement | string;
    position?: LatLng;
    map?: Map;
    removable?: boolean;
    zIndex?: number;
  }

  // ZoomControl: 줌 컨트롤
  class ZoomControl implements Control {}

  // Control: 지도 컨트롤 인터페이스 (활성화 시 주석 해제 후 필요 멤버 추가)
  //interface Control {} // 이전에 논의된 빈 인터페이스 오류를 피하기 위해 주석 처리하거나 멤버를 추가해야 합니다.
  // 현재는 location.tsx에서만 사용하고 다른 컨트롤 객체가 없으므로,
  // 빈 인터페이스인 이대로 두거나, 실제 Map.addControl에서 받는 객체들의 공통 타입을 명시해야 합니다.
  // 여기서는 다른 Control 객체(MapTypeControl 등)를 확장하는 경우를 고려하여 비워두되,
  // 실제 구현 시 MapTypeControl 등도 Control을 implements 한다면 Control에 공통 멤버를 추가해야 합니다.

  // ControlPosition: 컨트롤 위치 열거형
  enum ControlPosition {
    TOP = 0,
    TOPLEFT = 1,
    TOPRIGHT = 2,
    LEFT = 3,
    RIGHT = 4,
    BOTTOMLEFT = 5,
    BOTTOM = 6,
    BOTTOMRIGHT = 7,
  }

  // Event 객체
  namespace event {
    // target: Map, Marker, InfoWindow 외 다른 객체에서 이벤트를 리슨할 필요가 없으므로 `| any` 제거
    // handler: Kakao Maps API 문서에서 각 이벤트별 콜백 함수의 정확한 인자를 확인하여 더 구체적으로 명시할 수 있지만,
    // 일반적인 사용 패턴을 고려하여 `any[]`를 유지하되, 필요에 따라 개별적으로 더 상세히 정의 가능.
    // 여기서는 `MouseEvent` 등 일반적인 DOM 이벤트를 고려하여 `Event` 또는 `MouseEvent`를 추가할 수 있으나,
    // 카카오 맵스 이벤트의 정확한 타입을 알기 어려우므로 `...args: unknown[]`으로 변경하여 `any`보다는 안전하게 처리합니다.
    function addListener(
      target: Map | Marker | InfoWindow,
      type: string,
      handler: (...args: unknown[]) => void, // `any[]` 대신 `unknown[]` 사용
    ): void;
    function removeListener(
      target: Map | Marker | InfoWindow,
      type: string,
      handler: (...args: unknown[]) => void, // `any[]` 대신 `unknown[]` 사용
    ): void;
    function trigger(
      target: Map | Marker | InfoWindow,
      type: string,
      data?: object, // `any` 대신 `object` 또는 더 구체적인 타입 사용 (이벤트 데이터는 주로 객체 형태)
    ): void;
  }

  // 로드 함수
  function load(callback: () => void): void;

  // Size: 크기 객체
  class Size {
    constructor(width: number, height: number);
    width: number;
    height: number;
    equals(other: Size): boolean;
    toString(): string;
  }

  // Point: 포인트 객체
  class Point {
    constructor(x: number, y: number);
    x: number;
    y: number;
    equals(other: Point): boolean;
    toString(): string;
  }

  // LatLngBounds: 사각 영역 객체
  class LatLngBounds {
    constructor(sw: LatLng, ne: LatLng);
    extend(latlng: LatLng): void;
    getSouthWest(): LatLng;
    getNorthEast(): LatLng;
    isEmpty(): boolean;
    equals(other: LatLngBounds): boolean;
    contain(latlng: LatLng): boolean;
    getCenter(): LatLng;
  }

  // MapTypeId: 지도 유형 열거형
  enum MapTypeId {
    NORMAL = "ROADMAP",
    SKYVIEW = "SKYVIEW",
    HYBRID = "HYBRID",
    OVERLAY = "OVERLAY",
    ROADVIEW = "ROADVIEW",
    TRAFFIC = "TRAFFIC",
    TERRAIN = "TERRAIN",
    BICYCLE = "BICYCLE",
    BICYCLE_HYBRID = "BICYCLE_HYBRID",
    USE_DISTRICT = "USE_DISTRICT",
  }

  // services 라이브러리 관련 타입
  namespace services {
    // Geocoder (주소-좌표 변환 서비스)
    class Geocoder {
      constructor();
      addressSearch(
        address: string,
        // result: 정확한 타입은 Kakao API 문서를 참조해야 하지만, 일반적으로 배열이므로 `unknown[]`으로 변경
        callback: (result: unknown[], status: Status) => void,
        options?: { region_type?: string; query?: string },
      ): void;
      coord2Address(
        x: number,
        y: number,
        // result: 정확한 타입은 Kakao API 문서를 참조해야 하지만, 일반적으로 배열이므로 `unknown[]`으로 변경
        callback: (result: unknown[], status: Status) => void,
        options?: { input_coord?: Coords; output_coord?: Coords },
      ): void;
    }

    // Places (장소 검색 서비스)
    class Places {
      constructor(map?: Map);
      keywordSearch(
        keyword: string,
        // result: 정확한 타입은 Kakao API 문서를 참조해야 하지만, 일반적으로 배열이므로 `unknown[]`으로 변경
        callback: (
          result: unknown[],
          status: Status,
          pagination: Pagination,
        ) => void,
        options?: PlaceSearchOptions,
      ): void;
      categorySearch(
        categoryCode: string,
        // result: 정확한 타입은 Kakao API 문서를 참조해야 하지만, 일반적으로 배열이므로 `unknown[]`으로 변경
        callback: (
          result: unknown[],
          status: Status,
          pagination: Pagination,
        ) => void,
        options?: PlaceSearchOptions,
      ): void;
    }

    // PlaceSearchOptions (변경 없음)
    interface PlaceSearchOptions {
      location?: LatLng;
      radius?: number;
      bounds?: LatLngBounds;
      size?: number;
      page?: number;
      sort?: string;
      category_group_code?: string;
    }

    // Status (변경 없음)
    enum Status {
      OK = "OK",
      ZERO_RESULT = "ZERO_RESULT",
      ERROR = "ERROR",
    }

    // Pagination (변경 없음)
    interface Pagination {
      totalCount: number;
      page: number;
      size: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
      nextPage(): void;
      prevPage(): void;
      gotoPage(page: number): void;
    }

    // Coords 타입 추가 (services.Geocoder에서 사용되므로 명시)
    // Kakao Maps API 문서에 정확한 정의가 없으므로 일반적인 객체 또는 특정 string 리터럴 유니언으로 가정
    // 여기서는 string 리터럴 유니언으로 가정합니다.
    type Coords = "WGS84" | "WCONGNAMUL" | "CONGNAMUL"; // 예시. 실제 API 문서 확인 필요
  }
}

// 전역 Window 객체에 kakao 객체가 있음을 선언
declare global {
  interface Window {
    kakao: {
      maps: typeof kakao.maps; // 위에서 정의한 kakao.maps 네임스페이스를 참조
      services?: typeof kakao.maps.services; // services 라이브러리가 로드되었을 경우
    };
  }
}
