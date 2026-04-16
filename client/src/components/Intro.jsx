import SearchForm from "./SearchForm"
export default function Intro(){

    return(
        <section className="max-w-7xl mx-auto px-2 py-12 grid md:grid-cols-2 gap-8 items-center">
            <div>
                <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Book homes, experiences and more — <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">comfortably</span>.</h1>
                <p className="mt-4 text-gray-600">Verified hosts, real-time availability, easy chat & OTP check‑in. Find stays you’ll love.</p>
                <SearchForm/>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <img className="rounded-2xl object-cover w-full h-48 shadow-lg" src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=60" alt="stay-1"></img>
                <img className="rounded-2xl object-cover w-full h-48 shadow-lg" src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=60" alt="stay-2"></img>
                <img className="rounded-2xl object-cover w-full h-48 shadow-lg" src="https://images.unsplash.com/photo-1496412705862-e0088f16f791?auto=format&fit=crop&w=1200&q=60" alt="stay-3"></img>
                <img className="rounded-2xl object-cover w-full h-48 shadow-lg" src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=60" alt="stay-4"></img>
      
            </div>
        </section>
    )
}