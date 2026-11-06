import strapiClient from "@/lib/api/strapiClient";

const testEquipments = strapiClient.collection("test-equipments");

export type TestEquipmentSpec = {
  label: string;
  value: string;
};

export type TestEquipmentItem = {
  id: string;
  categoryId: string;
  name: string;
  summary: string;
  image: string;
  specs: TestEquipmentSpec[];
  order: number;
};

export type TestEquipmentCategory = {
  id: string;
  label: string;
  order: number;
};

export type TestEquipmentCatalog = {
  items: TestEquipmentItem[];
  categories: TestEquipmentCategory[];
};

type TestEquipmentDocument = {
  documentId?: string;
  name?: string | null;
  summary?: string | null;
  image?: unknown;
  specs?: unknown;
  order?: number | null;
  test_equipment_category?: {
    documentId?: string;
    name?: string | null;
    order?: number | null;
  } | null;
};

function textOf(value: unknown) {
  return typeof value === "string" ? value : "";
}

function imageUrl(value: unknown) {
  if (typeof value === "string") return value;
  if (!value || typeof value !== "object") return "";
  const record = value as { url?: unknown; secure_url?: unknown };
  if (typeof record.secure_url === "string") return record.secure_url;
  if (typeof record.url === "string") return record.url;
  return "";
}

function specsOf(value: unknown): TestEquipmentSpec[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((entry) => {
    if (!entry || typeof entry !== "object") return [];
    const spec = entry as { label?: unknown; value?: unknown };
    const label = textOf(spec.label);
    const specValue = textOf(spec.value);
    if (!label && !specValue) return [];
    return [{ label, value: specValue }];
  });
}

function orderOf(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function byOrderThenText(
  orderA: number,
  textA: string,
  orderB: number,
  textB: string,
  locale: string
) {
  if (orderA !== orderB) return orderA - orderB;
  return textA.localeCompare(textB, locale);
}

function categoryOf(value: TestEquipmentDocument["test_equipment_category"]) {
  const id = textOf(value?.documentId);
  if (!id) return null;
  return { id, label: textOf(value?.name), order: orderOf(value?.order) };
}

export async function loadTestEquipment(
  locale: string
): Promise<TestEquipmentCatalog> {
  const response = await testEquipments.find({
    locale,
    status: "published",
    populate: ["specs", "test_equipment_category"],
    pagination: { pageSize: 100 },
    sort: ["order:asc", "name:asc"],
  });

  const items: TestEquipmentItem[] = [];
  const categories: TestEquipmentCategory[] = [];
  const seen = new Set<string>();

  for (const document of (response?.data ?? []) as TestEquipmentDocument[]) {
    const category = categoryOf(document.test_equipment_category);
    const id = textOf(document.documentId);
    if (!category || !id) continue;

    items.push({
      id,
      categoryId: category.id,
      name: textOf(document.name),
      summary: textOf(document.summary),
      image: imageUrl(document.image),
      specs: specsOf(document.specs),
      order: orderOf(document.order),
    });

    if (!seen.has(category.id)) {
      seen.add(category.id);
      categories.push(category);
    }
  }

  items.sort((a, b) =>
    byOrderThenText(a.order, a.name, b.order, b.name, locale)
  );
  categories.sort((a, b) =>
    byOrderThenText(a.order, a.label, b.order, b.label, locale)
  );

  return { items, categories };
}
