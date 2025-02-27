"use client"
import { useState } from "react"

interface Ability {
    ability: {
        name: string;
    };
}

export default function Contact() {
    const [num, setNum] = useState<number>(0);
    const [abilities, setAbilities] = useState<string[]>([]);

    const fetchApi = async (): Promise<void> => {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon/ditto');
            const result = await response.json();

            console.log("ini adalah response: ", result.abilities);

            // Mengambil hanya nama ability dan menghindari `any`
            const abilityNames = result.abilities.map((item: Ability) => item.ability.name);
            setAbilities(abilityNames);
        } catch (error) {
            console.error("Terjadi kesalahan:", error);
        }
    }

    const handleClick = () => {
        setNum(prevNum => prevNum + 1);
        fetchApi();
    }

    return (
        <div className="flex flex-col w-screen h-screen justify-center items-center">
            <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleClick}
            >
                Click ini
            </button>

            <p className="text-2xl">{num}</p>

            {/* Menampilkan daftar abilities */}
            {abilities.length > 0 && (
                <div className="mt-4">
                    <p className="text-2xl font-bold">Abilities:</p>
                    <ul>
                        {abilities.map((ability, index) => (
                            <li key={index} className="text-xl">{ability}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}