export default function Loader({ text = "Finding best stays for you..." }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        
        {/* Logo / Icon */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white text-3xl shadow-lg animate-pulse">
          ⛱
        </div>

        {/* Brand */}
        <h1 className="text-xl font-semibold tracking-wide">
          Sthaan
        </h1>

        {/* Animated dots */}
        <div className="flex gap-2 mt-1">
          <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
          <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
          <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" />
        </div>

        {/* Optional text */}
        <p className="text-sm text-gray-600 mt-2 text-center">
          {text}
        </p>
      </div>
    </div>
  );
}
