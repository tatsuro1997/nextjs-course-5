import { useEffect, useState } from "react";

function LastSalesPage() {
  const [salse, setSalse] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://nextjs-course-dd497-default-rtdb.firebaseio.com/sales.json")
      .then((response) => response.json())
      .then((data) => {
        const transformedSalses = [];

        for (const key in data) {
          transformedSalses.push({
            id: key,
            username: data[key].username,
            volime: data[key].volume,
          });
        }

        setSalse(transformedSalses);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!salse) {
    return <p>No data yet</p>;
  }

  return (
    <ul>
      {salse.map((sale) => (
        <li key={sale.id}>
          {sale.username} - $ {sale.volume}
        </li>
      ))}
    </ul>
  );
}

export default LastSalesPage;
