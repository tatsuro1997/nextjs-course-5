import { useEffect, useState } from "react";
import useSWR from "swr";

function LastSalesPage() {
  const [sales, setSales] = useState();
  // const [isLoading, setIsLoading] = useState(false);

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(
    "https://nextjs-course-dd497-default-rtdb.firebaseio.com/sales.json",
    fetcher
  );

  useEffect(() => {
    console.log("data:", data);
    if (data) {
      const transformedSalses = [];

      console.log(data);

      for (const key in data) {
        transformedSalses.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }

      setSales(transformedSalses);
    }
  }, [data]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch("https://nextjs-course-dd497-default-rtdb.firebaseio.com/sales.json")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const transformedSalses = [];

  //       for (const key in data) {
  //         transformedSalses.push({
  //           id: key,
  //           username: data[key].username,
  //           volime: data[key].volume,
  //         });
  //       }

  //       setSalse(transformedSalses);
  //       setIsLoading(false);
  //     });
  // }, []);

  if (error) {
    return <p>Failed to load.</p>;
  }

  if (!data || !sales) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
}

export default LastSalesPage;
