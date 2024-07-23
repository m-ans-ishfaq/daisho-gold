export const AboutUsCard = ({ title, desc }: { title: string; desc: string; }) => (
    <div className={`w-full h-full border p-4 rounded-lg bg-neutral-50 flex flex-col justify-between gap-4`}>
        <div className="space-y-2">
            <h4 className="font-semibold text-lg">{title}</h4>
            <p className="text-justify text-neutral-500">{desc}</p>
        </div>
    </div>
)
