/* eslint-disable react/prop-types */
import axios from 'axios';
import Input from './Input'
import {useForm} from 'react-hook-form'
import { useSnackbar } from 'notistack';

// eslint-disable-next-line react/prop-types
const Form = ({updateData, editData}) => {
    const { enqueueSnackbar } = useSnackbar();
    const {
        register,
        handleSubmit,
        reset
        // watch,
        // formState: { errors },
      } = useForm()

      const defaultValues = editData ? {
        firstName: editData.firstName,
        lastName: editData.lastName,
        email: editData.email
    } : {};
    
      const onSubmit = async (data) => {
        try {
           if(editData){
            await axios.patch(`http://localhost:3002/crud/${editData.id}`, data)
            enqueueSnackbar('Data berhasil diedit', {
                variant: 'success',
                autoHideDuration: 2000, 
                anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
                }
              });
            updateData();
            reset();
           } else {
            await axios.post('http://localhost:3002/crud', data)
            enqueueSnackbar('Data berhasil ditambahkan', {
                variant: 'success',
                autoHideDuration: 2000, 
                anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
                }
              });
            updateData();
            reset();
           }
        } catch (error) {
            console.log(error)
        }
      };
      
    return(
        <>
       
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 py-2 w-[40%]">
        <h1 className='font-bold text-2xl'>{editData ? 'Edit Data' : 'Tambah Data'}</h1>
        <Input  placeholder={'First Name'} type={'text'}  name="firstName" register={register} defaultValue={defaultValues.firstName}/>
        <Input placeholder={'Last Name'} type={'text'}  name="lastName" register={register} defaultValue={defaultValues.lastName}/>
        <Input placeholder={'Email'} type={'email'}  name="email" register={register} defaultValue={defaultValues.email}/>
<button type="submit" className="btn btn-secondary">{editData ? 'Update' : 'Submit'}</button>
        </form>
        <hr />
</>
    )
}

export default Form