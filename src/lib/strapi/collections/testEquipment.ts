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
};

export type TestEquipmentCategory = {
  id: string;
  label: string;
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
  test_equipment_category?: {
    documentId?: string;
    name?: string | null;
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

function categoryOf(value: TestEquipmentDocument["test_equipment_category"]) {
  const id = textOf(value?.documentId);
  if (!id) return null;
  return { id, label: textOf(value?.name) };
}

export async function loadTestEquipment(
  locale: string
): Promise<TestEquipmentCatalog> {
  const response = await testEquipments.find({
    locale,
    status: "published",
    populate: ["specs", "test_equipment_category"],
    pagination: { pageSize: 100 },
    sort: ["name:asc"],
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
    });

    if (!seen.has(category.id)) {
      seen.add(category.id);
      categories.push(category);
    }
  }

  return { items, categories };
}
