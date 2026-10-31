"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Update() {
  const [formData, setFormData] = useState({
    name: "",
    noOfStudent: "",
    coordinator: "",
    activity: "",
  });
  const params = useParams();
  const { id } = params;
  const router = useRouter();

  // Fetch data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data for ID:", id);
      try {
        const res = await fetch(`/api/curricular/${id}`);
        console.log("Fetch response status:", res.status);
        if (res.ok) {
          const result = await res.json();
          console.log("Fetch response data:", result);
          const { data } = result;
          setFormData({
            name: data.name || "",
            noOfStudent: data.noOfStudent || "",
            coordinator: data.coordinator || "",
            activity: data.activity || "",
          });
        } else {
          console.error("Failed to fetch data, status:", res.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form data being submitted:", formData);
    try {
      const res = await fetch(`/api/curricular/${id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData),
      });

      console.log("Response status:", res.status);
      console.log("Response ok?", res.ok);

      if (res.ok) {
        const result = await res.json();
        console.log("Success response:", result);
        alert("Updated successfully");
        router.push("/curricular");
      } else {
        const errorResult = await res.json();
        console.log("Error response:", errorResult);
        alert("Failed to update");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      alert("Error updating data");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="h-100 w-100 border grid place-items-center mt-10 rounded-2xl">
        <h1>Update Details</h1>
        <form
          onSubmit={submitHandler}
          className="flex flex-col items-center justify-center space-y-3"
        >
          <input
            type="text"
            placeholder="enter name of programme"
            className="border "
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <input
            type="text"
            placeholder="enter number of student"
            name="noOfStudent"
            className="border "
            value={formData.noOfStudent}
            onChange={(e) =>
              setFormData({ ...formData, noOfStudent: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="enter coordinator"
            name="coordinator"
            className="border "
            value={formData.coordinator}
            onChange={(e) =>
              setFormData({ ...formData, coordinator: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="enter activity"
            name="activity"
            className="border "
            value={formData.activity}
            onChange={(e) =>
              setFormData({ ...formData, activity: e.target.value })
            }
          />

          <button type="submit" className="hover:text-green-500">
            submit
          </button>
        </form>
      </div>
    </main>
  );
}
