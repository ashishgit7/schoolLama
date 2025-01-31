import { FieldError } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


type InputFieldProps = {
  label: string;
  type?: string;
  register: any;
  name: string;
  defaultValue?: string;
  error?: FieldError;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  options?:  any,
  handleChange?: any
};

const InputField = ({
  label,
  type = "text",
  register,
  name,
  defaultValue,
  error,
  inputProps,
  options,
  handleChange
}: InputFieldProps) => {
  return type === "select" ? (
    <>
     <div className="flex flex-col gap-2 w-full md:w-1/4">
          {/* <label className="text-xs text-gray-500">{label} {defaultValue}</label> */}
          {/* <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register(name)}
            defaultValue={defaultValue}
            onChange={handleChange}
          >
            {
            options?.map((opt : {value:string, id:any},ind:number)=> <option selected={ind === 0} key={opt.value} value={opt.id} > {opt.value}</option>)
            }
          </select> */}
          <Select  defaultValue = {defaultValue}
            onValueChange={handleChange}>
            <SelectTrigger className="w-[180px]" >
              <SelectValue placeholder={`Select a ${label}`} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{label} </SelectLabel>
                {
            options?.map((opt : {value:string, id:any})=> <SelectItem key={opt.value} value={opt.id} > {opt.value}</SelectItem>)
            }
              </SelectGroup>
            </SelectContent>
          </Select>
          <input type="hidden" {...register(name)}/>
          {error?.message?.toString() && <p className="error">{error?.message?.toString()}</p>}
        </div>
    </>
    
  ) : (
    <div className="flex flex-col gap-2 w-full md:w-1/4">
      <label className="text-xs text-gray-500">{label}</label>
      <input
        type={type}
        {...register(name)}
        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
        {...inputProps}
        defaultValue={defaultValue}
        onChange={handleChange}
      />
      {error?.message && (
        <p className="text-xs text-red-400">{error.message.toString()}</p>
      )}
    </div>
  );
};

export default InputField;
