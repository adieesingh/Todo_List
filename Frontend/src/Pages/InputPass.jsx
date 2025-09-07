export const InputPass = ({label,placeholder,onChange,value})=>{
    return <div>
    <div className="text-sm font-medium text-left py-2">
        {label}
    </div>
    <div>
        <input type="password" placeholder={placeholder} onChange={onChange} value={value} className="w-full px-4 py-1 border border-slate-200" />
    </div>
  </div>
}