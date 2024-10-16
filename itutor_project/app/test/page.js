'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';


export default function test() {

  const [getTopic, setTopics] = useState([])
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  
  
  useEffect(() => {
    const search = async () => {
      let response = await fetch("http://localhost:3100/api/course/getCourse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include', // ส่ง cookies ไปด้วย
        body: JSON.stringify({ course_id: id }),
      });
      const result = await response.json();
      setTopics(result.data)
    }
    search();
  }, []);
  return (
    <div>
      {getTopic.map((topic) => (
        <div className="p-4" key={topic.course_id}>
          <h2 className="text-xl font-semibold text-center">
            Topic Name: {topic.course_name}
          </h2>
          <p className="text-gray-700 text-center">
            Topic Description: {topic.course_desc}
          </p>
          <p className='text-gray-700 text-center underline'>
            OTHER COLUMN GET FROM DB COLUMN NAME THIS IS JUST EXAMPLE
          </p>
        </div>
      ))}
    </div>
  );
}
