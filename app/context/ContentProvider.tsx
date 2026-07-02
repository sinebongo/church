"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type ContentMap = Record<string, string>;

const ContentContext = createContext<ContentMap>({});

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<ContentMap>({});

  useEffect(() => {
    const fetchContent = async () => {
      const { data, error } = await supabase.from("site_content").select("section, key, value");
      if (!error && data) {
        const map: ContentMap = {};
        for (const row of data) {
          map[`${row.section}.${row.key}`] = row.value ?? "";
        }
        setContent(map);
      }
    };
    fetchContent();
  }, []);

  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}

export function useContent(key: string, fallback: string): string {
  const content = useContext(ContentContext);
  return content[key] || fallback;
}
