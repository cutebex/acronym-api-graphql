export interface Acronym {
  _id: string;
  acronym: string;
  definition: string;
}
export interface AcronymGroup {
  acronyms: Acronym[];
  isOnly: boolean;
}
