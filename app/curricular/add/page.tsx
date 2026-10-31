'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Adding() {
    const [formData, setFormData] = useState({
        name: "",
        noOfStudent: "",
        coordinator: "",
        activity: ""
    });
    const router = useRouter();

    const addHandler = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }
    const fetchData = async () => {

        const res = await fetch('/api/curricular', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        const result = await res.json();
        console.log("added sucessfully", result);
        setFormData(result)
        if (!result.ok) {
            alert('added sucessfull')
            setFormData({
                name: "",
                noOfStudent: "",
                coordinator: "",
                activity: ""
            });
            router.push('/curricular')
        }
        else {
            alert('fail to add')
        }
    }


    return (
        <main className="min-h-screen p-6 grid place-items-center">
            <h1>Add some programme or Extra-Curricular</h1>
            <div className="border p-10 flex flex-col gap-7 rounded bg-gray-800">
                <input type="text" placeholder="enter the name of programme "
                    className="border border-gray-400 rounded-md py-2 px-20"
                    onChange={addHandler}
                    name="name"
                    value={formData.name} />
                <input type="text" placeholder="enter the number of student flex justify-start"
                    className="border border-gray-400 rounded-md py-2 px-20"
                    onChange={addHandler}
                    name="noOfStudent"
                    value={formData.noOfStudent} />
                <input type="text" placeholder="Name coordinator"
                    className="border border-gray-400 rounded-md py-2 px-20"
                    onChange={addHandler}
                    name="coordinator"
                    value={formData.coordinator} />
                <input type="text" placeholder="Activity"
                    className="border border-gray-400 rounded-md py-2 px-20"
                    onChange={addHandler}
                    name="activity"
                    value={formData.activity} />


                <button type="submit" className="hover:text-blue-500" onClick={fetchData} >
                    submit
                </button>

            </div>

        </main>
    )
}