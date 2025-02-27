"use client"
import { useEffect, useState } from "react"

export default function Contact() {
    const [num, setNum] = useState<number>(0);
    const [abilities, setAbilities] = useState<string[]>([]);
 
    const fetchApi = async (): Promise<void> => {
        const response = await fetch('https://broadcast-api.zainzo.com/api/contact');
        const data = await response.json();

        console.log("ini adalah response: ",  data.abilities)
        const abilityNames = data.abilities.map((item: any) => item.ability.name);
        setAbilities(abilityNames);
    }

    const click = () => {
        setNum(num + 1);
    }

    useEffect(() => {
        fetchApi()
    }, [])

    return (
        <div className="flex flex-col w-screen h-screen justify-center items-center">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={click}    
            >Click ini</button>

            <p className="text-2xl">{num}</p>
            

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
    )
}