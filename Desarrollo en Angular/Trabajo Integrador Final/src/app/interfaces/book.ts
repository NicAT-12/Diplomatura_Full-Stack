/** Libro resumido, usado en listados y favoritos. */
export interface BookSummary {
  id: string;
  titulo: string;
  autores: string[];
  anio: number | null;
  portadaId: number | null;
}

/** Libro con toda la información de la página de detalle. */
export interface BookDetail extends BookSummary {
  descripcion: string;
  temas: string[];
}

export interface SearchResult {
  total: number;
  libros: BookSummary[];
}

/** Forma de la respuesta de https://openlibrary.org/search.json */
export interface OpenLibrarySearchResponse {
  numFound: number;
  docs: {
    key: string;
    title: string;
    author_name?: string[];
    first_publish_year?: number;
    cover_i?: number;
  }[];
}

/** Forma de la respuesta de https://openlibrary.org/works/{id}.json */
export interface OpenLibraryWork {
  title: string;
  description?: string | { value: string };
  covers?: number[];
  subjects?: string[];
  first_publish_date?: string;
  authors?: { author: { key: string } }[];
}

export interface OpenLibraryAuthor {
  name: string;
}
