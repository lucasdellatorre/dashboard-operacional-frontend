/**
 * Normaliza uma string removendo acentos e convertendo para minúsculas
 * @param str String a ser normalizada
 * @returns String normalizada sem acentos e em minúsculas
 */
export const normalizeString = (str: string): string => {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};
