import Airtable, { FieldSet, Record as AirtableRecord, Records, Table } from 'airtable';

// Helper function to get the base client instance
export function getAirtableBase() {
  const apiKey = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
  const baseId = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;
  // Debug logs for env vars
  console.log('getAirtableBase - API Key:', apiKey);
  console.log('getAirtableBase - Base ID:', baseId);
  if (!apiKey || !baseId) {
    // Throw a specific error if env vars are missing
    throw new Error('Airtable API Key or Base ID is missing from environment variables.');
  }
  // Configure Airtable on demand
  return new Airtable({ apiKey }).base(baseId);
}

// Define a base record type that our specific types will extend
export interface BaseAirtableRecord extends FieldSet {
  id: string;
}

// --- Query Parameters ---
export interface QueryParams {
  filterBy?: string;
  filterValue?: string;
  filterByFormula?: string;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  pageSize?: number;
  fields?: string[]; // ADDED: Optional array of field names to fetch
}

// --- Mutation Result Type ---
export interface MutationResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// --- Fetch Records ---
export async function fetchRecords<T extends { id: string }>(
  tableIdOrName: string,
  options: QueryParams = {}
): Promise<{ records: T[]; totalCount: number; offset?: string }> {
  console.log(`[fetchRecords] Fetching from ${tableIdOrName} with options:`, options);
  const base = getAirtableBase();
  const table = base(tableIdOrName) as Table<FieldSet>;

  const {
    filterBy,
    filterValue,
    filterByFormula,
    sortBy,
    sortDirection = 'asc',
    pageSize = 100,
    fields,
  } = options;

  const queryOptions: Record<string, unknown> = { pageSize };

  if (filterByFormula) {
    queryOptions.filterByFormula = filterByFormula;
  } else if (filterBy && filterValue) {
    if (filterBy.toUpperCase() === 'RECORD_ID()') {
      queryOptions.filterByFormula = `RECORD_ID() = '${filterValue}'`;
    } else {
      queryOptions.filterByFormula = `{${filterBy}} = '${filterValue}'`;
    }
  }

  if (sortBy) {
    queryOptions.sort = [{ field: sortBy, direction: sortDirection }];
  }

  if (fields && fields.length > 0) {
    queryOptions.fields = fields;
  }

  try {
    const allFetchedAirtableRecords: Records<FieldSet> = await table.select(queryOptions).all();

    const records = allFetchedAirtableRecords.map((record: AirtableRecord<FieldSet>) => {
      return ({
        id: record.id,
        createdTime: record._rawJson?.createdTime,
        ...record.fields,
      } as unknown) as T;
    });

    console.log(`[fetchRecords] Received ${records.length} records from ${tableIdOrName}.`);

    return {
      records,
      totalCount: records.length,
    };
  } catch (error) {
    console.error(`[fetchRecords] Error fetching from ${tableIdOrName}:`, error);
    return { records: [], totalCount: 0 };
  }
}

// --- Create Record ---
export async function createRecord<T extends { id: string }>(
  tableIdOrName: string,
  fields: Omit<T, 'id' | 'createdTime'>
): Promise<MutationResult<T>> {
  const base = getAirtableBase();
  try {
    const createdRecords = await base(tableIdOrName).create([{ fields: fields as FieldSet }]);
    const recordData = createdRecords[0] as AirtableRecord<FieldSet>;
    return {
      success: true,
      data: ({
        id: recordData.id,
        createdTime: recordData._rawJson?.createdTime,
        ...recordData.fields,
      } as unknown) as T,
    };
  } catch (error) {
    console.error(`[createRecord] Error creating in ${tableIdOrName}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

// --- Update Record ---
export async function updateRecord<T extends { id: string }>(
  tableIdOrName: string,
  id: string,
  fields: Partial<Omit<T, 'id' | 'createdTime'>>
): Promise<MutationResult<T>> {
  const base = getAirtableBase();
  try {
    const updatedRecords = await base(tableIdOrName).update([{ id, fields: fields as FieldSet }]);
    const recordData = updatedRecords[0] as AirtableRecord<FieldSet>;
    return {
      success: true,
      data: ({
        id: recordData.id,
        createdTime: recordData._rawJson?.createdTime,
        ...recordData.fields,
      } as unknown) as T,
    };
  } catch (error) {
    console.error(`[updateRecord] Error updating ${id} in ${tableIdOrName}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

// --- Delete Record ---
export async function deleteRecord(
  tableIdOrName: string,
  id: string
): Promise<MutationResult<void>> {
  const base = getAirtableBase(); // Get base instance here
  try {
    await base(tableIdOrName).destroy([id]);
    return { success: true };
  } catch (error) {
    console.error(`[deleteRecord] Error deleting ${id} from ${tableIdOrName}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
