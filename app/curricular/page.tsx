"use client";
import { useState, useEffect } from "react";
import Link from 'next/link';
export default function Extra() {
    const [data, setData] = useState<any[]>([]);
    const [isAdmin, setIsAdmin] = useState(false);

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/curricular`);
            const result = await response.json();
            setData(result.data);
            console.log(result);
        } catch (error) {
            console.error({ Message: "error fetching" });
        }
    }
    const deleteItem = async (id: number, name: string) => {
        if (!window.confirm(`Delete "${name}"?`)) return;
        const res = await fetch(`/api/curricular/${id}`, { method: "DELETE" });
        if (res.ok) {
            setData((items) => items.filter((item) => item.id !== id));
        } else if (res.status === 401) {
            alert("Please log in as admin to delete.");
        } else {
            alert("Failed to delete");
        }
    };

    useEffect(() => {
        fetchData();
        fetch("/api/admin/me")
            .then((res) => res.json())
            .then((result) => setIsAdmin(Boolean(result.isAdmin)))
            .catch(() => setIsAdmin(false));
    }, [])
    return (
        <main className="min-h-screen">
            <h1 className="text-blue-400 font-bold text-2xl flex items-center justify-center mt-4">List of Extra-Curricular Activity</h1>
            {isAdmin && (
                <Link href="/curricular/add" className="text-xl flex justify-end hover:text-blue-300 hover:underline">Add Programme</Link>
            )}
            <div className="p-6 flex flex-col gap-5">
                {data.map(items => (
                    <div key={items.id} className="p-10 grid grid-cols-3 gap-5 border bg-gray-800 rounded ml-30 mr-30">
                        <div className="bg-gray-600 rounded-3xl p-4 col-span-2">
                            <h1>Sl.No:{items.id}</h1>
                            <h1 className="font-bold">Name of extra-curricular: {items.name}</h1>
                            <h1>Corrdinator: {items.coordinator}</h1>
                            <h1>Number of Student: {items.noOfStudent}</h1>
                            <h1>Activity: {items.activity}</h1>
                        </div>
                        {isAdmin && (
                            <div className="text-2xl flex gap-5 items-center justify-center">
                                <Link href={`/curricular/edit/${items.id}`} className="text-blue-500 hover:text-white hover:underline">Update Details</Link>
                                <button onClick={() => deleteItem(items.id, items.name)} className="text-red-500 hover:text-white hover:underline cursor-pointer">Delete</button>
                            </div>
                        )}



                    </div>
                ))}

            </div>
        </main>
    )
};
