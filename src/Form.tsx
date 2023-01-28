import { FunctionComponent, ReactComponentElement, useState } from "react";
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { tw } from "@twind/core";

// type PersonType = "person" | "company";
const personTypeArray = ["person", "company"] as const;
type PersonType = typeof personTypeArray[number];
const DEFAULT_PERSON_TYPE: PersonType = "person" as const;

const formSchema = z.object({
  conditionalInputs: z
    .object({
      personName: z.string().min(1),
      type: z.literal<PersonType>("person"),
    })
    .or(
      z.object({
        companyName: z.string().min(1),
        type: z.literal<PersonType>("company"),
      })
    ),
  number: z.string().min(1),
});

type FormSchema = z.infer<typeof formSchema>;

export const Form: FunctionComponent = (props) => {
  const twBorderWrap = tw(
    "border-2 border-yellow-700 p-2 rounded flex flex-col"
  );

  const {
    control,
    handleSubmit,
    formState: { errors: formErrors, isValid: isFormValid },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      conditionalInputs: {
        type: "person",
        personName: "",
        companyName: "",
      },
      number: "",
    },
    mode: "all",
  });

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    console.log("submit");
    console.log({ data });
  };
  const onError: SubmitErrorHandler<FormSchema> = (errors) => {
    console.log("error");
    console.log({ errors });
  };

  console.log(formErrors);

  return (
    <>
      <button onClick={() => {}}>Toggle type</button>
      <span className="mb-10">
        {JSON.stringify({ formErrors, isFormValid })}
      </span>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="flex flex-col space-y-3 items-start"
      >
        <h2>This is form</h2>

        <Controller
          control={control}
          name="conditionalInputs.type"
          render={({ field, fieldState }) => (
            <div className={twBorderWrap}>
              {<span>field{JSON.stringify(field)}</span>}
              {<span>fieldState{JSON.stringify(fieldState)}</span>}
              {<span>value: {JSON.stringify(field.value)}</span>}
              <select {...field}>
                {personTypeArray.map((person) => (
                  <option value={person} key={person}>
                    {person}
                  </option>
                ))}
              </select>
            </div>
          )}
        ></Controller>

        <Controller
          control={control}
          name="conditionalInputs.personName"
          render={({ field, fieldState: { error }, formState }) => {
            return (
              <div className={twBorderWrap}>
                {<span>{JSON.stringify(field)}</span>}
                {<span>error: {JSON.stringify(error)}</span>}
                value: {JSON.stringify(field.value)}
                <label className="block mb-1">
                  {field.name}
                  <input {...field} className="block" />
                </label>
              </div>
            );
          }}
        ></Controller>

        <Controller
          control={control}
          name="conditionalInputs.companyName"
          render={({ field, fieldState: { error } }) => {
            return (
              <div className={twBorderWrap}>
                {<span>{JSON.stringify(field)}</span>}
                {<span>error{JSON.stringify(error)}</span>}
                value: {JSON.stringify(field.value)}
                <label className="block mb-1">
                  {field.name}
                  <input {...field} className="block" />
                </label>
              </div>
            );
          }}
        ></Controller>

        <Controller
          control={control}
          name="number"
          render={({ field, fieldState: { error } }) => {
            return (
              <div className={twBorderWrap}>
                {<span>{JSON.stringify(field)}</span>}
                {<span>error{JSON.stringify(error)}</span>}
                value: {JSON.stringify(field.value)}
                <label className="block mb-1">
                  {field.name}
                  <input {...field} className="block" />
                </label>
              </div>
            );
          }}
        ></Controller>

        <button
          type="submit"
          disabled={!isFormValid}
          className="disabled:bg-gray-300 bg-green-300 px-3 py-1 rounded"
        >
          Submit - isValid: {JSON.stringify(isFormValid)}
        </button>
      </form>
    </>
  );
};
