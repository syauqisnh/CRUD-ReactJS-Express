// eslint-disable-next-line react/prop-types
const Input = ({placeholder, type, register, name, defaultValue }) => {
    return(
        <div className="form-input">
            <label className="input input-bordered flex items-center gap-2">
                {/* Gunakan defaultValue jika nilainya bukan null */}
                <input type={type} className="grow" placeholder={placeholder}  {...register(name)} defaultValue={defaultValue !== null ? defaultValue : ''} />
            </label>
        </div>
    )
}
export default Input;
