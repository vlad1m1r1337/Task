import React, { useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "../hooks";
import { postToTable } from "../store/tableSlice";
import { Button } from 'primereact/button';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import { Message } from "primereact/message";
import { formSchema, IFormInput } from "../shemas/formSchema";

export const Form: React.FC = () => {
    const dispatch = useAppDispatch();
    const addToTable = useAppSelector(state => state.table.addToTable);
    const loading = useAppSelector(state => state.table.request_status.loading);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<IFormInput>({
        resolver: zodResolver(formSchema)
    });

    const [file, setFile] = useState<File | null>(null);
    const toast = useRef<Toast>(null);
    const fileUploadRef = useRef<FileUpload>(null);

    const onFileSelect = (e: any) => {
        setFile(e.files[0]);
    };

    const onFileRemove = () => {
        setFile(null);
        if (fileUploadRef.current) {
            fileUploadRef.current.clear();
        }
    };

    const onSubmit: SubmitHandler<IFormInput> = data => {
        if (!file) {
            if (toast.current) {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please upload a photo' });
            }
            return;
        }

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("surname", data.surname);
        formData.append("age", data.age.toString());
        formData.append("email", data.email);
        formData.append("file", file);

        const fileData = { objectURL: URL.createObjectURL(file) };
        dispatch(postToTable({ ...addToTable, ...data, file: fileData }));
        reset();
        onFileRemove();
    };

    return (
        <header className="header">
            <h2 className="header_name">Форма Отправки</h2>
            <form className="form_wrapper" onSubmit={handleSubmit(onSubmit)} noValidate>
                <label htmlFor="name">Name: </label>
                <InputText type="text" {...register("name")} />
                {errors.name && <Message severity="error" text={errors.name.message}/>}

                <label htmlFor="surname">Surname: </label>
                <InputText type="text" {...register("surname")} />
                {errors.surname && <Message severity="error" text={errors.surname.message}/>}

                <label htmlFor="age">Age: </label>
                <InputText type="number" {...register("age", { valueAsNumber: true })} />
                {errors.age && <Message severity="error" text={errors.age.message}/>}

                <label htmlFor="email">Email: </label>
                <InputText type="email" {...register("email")} />
                {errors.email && <Message severity="error" text={errors.email.message}/>}

                <div className="card flex justify-content-center">
                    <Toast ref={toast}></Toast>
                    <div className="file_buttons">
                        <FileUpload
                            ref={fileUploadRef}
                            mode="basic"
                            name="demo[]"
                            accept="image/*"
                            maxFileSize={1000000}
                            onSelect={onFileSelect}
                            customUpload
                            uploadHandler={() => {}}
                        />
                        {file && <Button label="Удалить файл" onClick={onFileRemove} />}
                    </div>
                </div>
                <Button label="Отправить" type="submit" loading={loading} />
            </form>
        </header>
    );
}