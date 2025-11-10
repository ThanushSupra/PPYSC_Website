"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { CalendarIcon } from "lucide-react"

import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


const caPostal = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
const caPhone =
  /^\+?1?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

export const childRegistrationSchema = z.object({
  firstName: z.string().trim().min(2, "First name is too short").max(50),
  
  middleName: z.string().trim().max(50).optional(),

  lastName: z.string().trim().min(2, "Last name is too short").max(50),

  preferredName: z.string().trim().min(2).max(50).optional(),

  age: z.coerce.number().int().min(0, "Age must be greater then 0").max(17, "Must be under 18"),

  emailAddress: z.string().trim().email("Enter a valid email"),

  mobilePhoneNumber: z
    .string()
    .trim()
    .regex(caPhone, "Enter a valid 10-digit phone number"),

  dateOfBirth: z
    .coerce.date()
    .max(new Date(), "Date of birth must be in the past"),

  houseAddress: z.string().trim().min(5, "Address is too short").max(100),

  postalCode: z
    .string()
    .trim()
    .toUpperCase()
    .regex(caPostal, "Use Canadian format: A1A 1A1"),

  city: z.string().trim().min(2, "City name is too short").max(50, "City name is too long"),

  province: z.enum([
    "AB","BC","MB","NB","NL","NS","NT","NU","ON","PE","QC","SK","YT",
  ]),
});

type ChildFormValues = z.input<typeof childRegistrationSchema>; // pre-coercion types
// helpers to mirror Calendar28 behavior
function formatDate(date: Date | undefined) {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }
  function isValidDate(date: Date | undefined) {
    if (!date) return false;
    return !isNaN(date.getTime());
  }

export default function Otp1 () { 

    const form = useForm<ChildFormValues>({
        resolver: zodResolver(childRegistrationSchema), 
        mode: "onChange",
        defaultValues: { 
            firstName: "",
            middleName: "",
            lastName: "",
            preferredName: "",
      
            age: undefined,                 // will be coerced to number
      
            emailAddress: "",
            mobilePhoneNumber: "",
      
            dateOfBirth: undefined,         // use "YYYY-MM-DD" from <input type="date">
      
            houseAddress: "",
            postalCode: "",
            city: "",
            province: undefined,     // force user to choose from the enum
        },
    })

        // local UI state for the DOB input, matching Calendar28 usage
    const [dobOpen, setDobOpen] = React.useState(false);
    const [dobMonth, setDobMonth] = React.useState<Date | undefined>(undefined);
    const [dobText, setDobText] = React.useState("");


    function onSubmit(data: z.infer<typeof childRegistrationSchema>) {

        

    }

    return ( 
    <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-3xl">
            <CardHeader>
                <CardTitle>
                    Child Reigstration
                </CardTitle>
                <CardDescription>
                    Fill in all the inputs below as accurately as possible
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form id="child-form" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        {/* First Name */}
                        <Controller
                          name="firstName"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                              <Input
                                id="firstName"
                                {...field}
                                value={field.value ?? ""}
                                autoComplete="given-name"
                                placeholder="Jane"
                                aria-invalid={fieldState.invalid}
                              />
                              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                          )}
                        />

                        {/* Middle Name (optional) */}
                        <Controller
                          name="middleName"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor="middleName">Middle Name (optional)</FieldLabel>
                              <Input
                                id="middleName"
                                {...field}
                                value={field.value ?? ""}
                                autoComplete="additional-name"
                                placeholder="A."
                                aria-invalid={fieldState.invalid}
                              />
                              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                          )}
                        />

                        {/* Last Name */}
                        <Controller
                          name="lastName"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                              <Input
                                id="lastName"
                                {...field}
                                value={field.value ?? ""}
                                autoComplete="family-name"
                                placeholder="Doe"
                                aria-invalid={fieldState.invalid}
                              />
                              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                          )}
                        />

                        {/* Preferred Name (optional) */}
                        <Controller
                          name="preferredName"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor="preferredName">Preferred Name (optional)</FieldLabel>
                              <Input
                                id="preferredName"
                                {...field}
                                value={field.value ?? ""}
                                placeholder="Janey"
                                aria-invalid={fieldState.invalid}
                              />
                              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                          )}
                        />

                        {/* Age */}
                        <Controller
                          name="age"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor="age">Age</FieldLabel>
                              <Input
                                id="age"
                                type="number"
                                inputMode="numeric"
                                {...field}
                                value={field.value ?? ""}
                                placeholder="12"
                                aria-invalid={fieldState.invalid}
                              />
                              <FieldDescription>Must be between 0 and 17.</FieldDescription>
                              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                          )}
                        />

                        {/* Email Address */}
                        <Controller
                          name="emailAddress"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor="emailAddress">Email Address</FieldLabel>
                              <Input
                                id="emailAddress"
                                type="email"
                                autoComplete="email"
                                {...field}
                                value={field.value ?? ""}
                                placeholder="jane.doe@example.com"
                                aria-invalid={fieldState.invalid}
                              />
                              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                          )}
                        />

                        {/* Mobile Phone Number */}
                        <Controller
                          name="mobilePhoneNumber"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor="mobilePhoneNumber">Mobile Phone Number</FieldLabel>
                              <Input
                                id="mobilePhoneNumber"
                                type="tel"
                                inputMode="tel"
                                {...field}
                                value={field.value ?? ""}
                                placeholder="(555) 123-4567"
                                aria-invalid={fieldState.invalid}
                              />
                              <FieldDescription>Canadian format accepted (e.g., 555-123-4567).</FieldDescription>
                              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                          )}
                        />

            {/* Date of Birth — Popover + Calendar (Calendar28 pattern) */}
            <Controller
              name="dateOfBirth"
              control={form.control}
              render={({ field, fieldState }) => {
                // sync the visible text when field value changes externally
                React.useEffect(() => {
                  setDobText(formatDate(field.value as unknown as Date | undefined));
                  if (field.value && !dobMonth) setDobMonth(field.value as unknown as Date);
                }, [field.value]); // eslint-disable-line

                return (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="dob-input">Date of Birth</FieldLabel>
                    <div className="relative flex gap-2">
                      <Input
                        id="dob-input"
                        value={dobText}
                        placeholder="June 01, 2015"
                        className="bg-background pr-10"
                        onChange={(e) => {
                          const nextText = e.target.value;
                          setDobText(nextText);
                          const parsed = new Date(nextText);
                          if (isValidDate(parsed)) {
                            field.onChange(parsed);
                            setDobMonth(parsed);
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "ArrowDown") {
                            e.preventDefault();
                            setDobOpen(true);
                          }
                        }}
                        aria-invalid={fieldState.invalid}
                      />
                      <Popover open={dobOpen} onOpenChange={setDobOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            id="dob-picker"
                            variant="ghost"
                            className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                            type="button"
                          >
                            <CalendarIcon className="size-3.5" />
                            <span className="sr-only">Select date</span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto overflow-hidden p-0"
                          align="end"
                          alignOffset={-8}
                          sideOffset={10}
                        >
                          <Calendar
                            mode="single"
                            selected={field.value as unknown as Date | undefined}
                            captionLayout="dropdown"
                            month={dobMonth}
                            onMonthChange={setDobMonth}
                            onSelect={(date) => {
                              field.onChange(date);
                              setDobText(formatDate(date));
                              setDobOpen(false);
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <FieldDescription>Type a date or use the calendar.</FieldDescription>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                );
              }}
            />

                        {/* House Address */}
                        <Controller
                          name="houseAddress"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor="houseAddress">House Address</FieldLabel>
                              <Input
                                id="houseAddress"
                                {...field}
                                value={field.value ?? ""}
                                autoComplete="street-address"
                                placeholder="123 Maple St"
                                aria-invalid={fieldState.invalid}
                              />
                              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                          )}
                        />

                        {/* Postal Code */}
                        <Controller
                          name="postalCode"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor="postalCode">Postal Code</FieldLabel>
                              <Input
                                id="postalCode"
                                {...field}
                                value={field.value ?? ""}
                                placeholder="A1A 1A1"
                                aria-invalid={fieldState.invalid}
                              />
                              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                          )}
                        />

                        {/* City */}
                        <Controller
                          name="city"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor="city">City</FieldLabel>
                              <Input
                                id="city"
                                {...field}
                                value={field.value ?? ""}
                                autoComplete="address-level2"
                                placeholder="Toronto"
                                aria-invalid={fieldState.invalid}
                              />
                              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                          )}
                        />

                        {/* Province (native select) */}
                        <Controller
                          name="province"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor="province">Province</FieldLabel>
                              <select
                                id="province"
                                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                value={field.value ?? ""}
                                onChange={(e) => field.onChange(e.target.value)}
                                onBlur={field.onBlur}
                                aria-invalid={fieldState.invalid}
                              >
                                <option value="" disabled>
                                  Select a province
                                </option>
                                <option value="AB">AB</option>
                                <option value="BC">BC</option>
                                <option value="MB">MB</option>
                                <option value="NB">NB</option>
                                <option value="NL">NL</option>
                                <option value="NS">NS</option>
                                <option value="NT">NT</option>
                                <option value="NU">NU</option>
                                <option value="ON">ON</option>
                                <option value="PE">PE</option>
                                <option value="QC">QC</option>
                                <option value="SK">SK</option>
                                <option value="YT">YT</option>
                              </select>
                              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                          )}
                        />
                    </FieldGroup>
                </form>
            </CardContent>

            <CardFooter>
              <Field orientation="horizontal">
                <Button type="button" variant="outline" onClick={() => form.reset()}>
                  Reset
                </Button>
                <Button type="submit" form="child-form">
                  Next
                </Button>
              </Field>
            </CardFooter>
        </Card>
        </div>
    )
}