import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function WorksPage() {
    const { composerName } = useParams();
    const [works, setWorks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchWorks() {
            setLoading(true);
            try {
                const response = await fetch(
                    `https://corsproxy.io/?https://imslp.org/api.php?action=query&list=categorymembers&cmtitle=Category:${encodeURIComponent(
                        composerCategory
                    )}&cmlimit=500&format=json&origin=*`
                );
                if (!response.ok) {
                    throw new Error(
                        `Die Werke konnten leider nicht abgerufen werden: ${response.statusText}`
                    );
                }
                const data = await response.json();
                const worksArray = data.query.categorymembers;

                // removing anything which is not the compositions
                const filteredWorks = worksArray.filter(
                    (item) => !item.title.startsWith("Category:")
                );

                // sorting the compositions in alphbetic order
                filteredWorks.sort((a, b) => a.title.localeCompare(b.title));

                setWorks(filteredWorks);
                console.log(filteredWorks);
                
            } catch (error) {
                setError(`Fehler beim Abrufen der Werke: ${error.message}`);
            } finally {
                setLoading(false);
            }
        }
        fetchWorks();
    }, [composerName]);

    return (
    <div>
      <h2>Werke von {composerName.replace(/_/g, ' ')}</h2>
      {/* {works.length > 0 ? (
        <ul>
          {works.map((work)=> (
            <li key={work.pageid}>
              <a href={`https://imslp.org/wiki/${encodeURIComponent(work.title)}`} target="_blank" >
                {work.title}
              </a>
            </li>
          ))}
        </ul>
      )} */}
    </div>
    );
}
