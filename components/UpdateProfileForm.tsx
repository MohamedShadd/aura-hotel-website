"use client";
import React, { useState } from "react";

import Image from "next/image";
import guestInterface from "@/app/_lib/types/guestInterface";
import { updateGuest } from "@/app/_lib/actions";
import { useFormStatus } from "react-dom";
import SpinnerMini from "./SpinnerMini";
import { useToast } from "@/components/ui/use-toast";
import SubmitButton from "./SubmitButton";

export default function UpdateProfileForm({
  guest,
  children,
}: {
  children: React.ReactNode;
  guest: guestInterface;
}) {
  const { fullName, email, nationality, nationalID, countryFlag } = guest;
  const { toast } = useToast();

  return (
    <form
      action={(data) =>
        updateGuest(data).then((res) => {
          toast({
            description: res,
          });
        })
      }
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col rounded-lg"
    >
      <div className="space-y-2">
        <label>Full name</label>
        <input
          disabled
          defaultValue={fullName}
          name="fullName"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          disabled
          defaultValue={email}
          name="email"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          {guest.countryFlag && (
            <Image
              width={20}
              height={20}
              src={countryFlag as string}
              alt="Country flag"
              className="h-5 rounded-sm"
            />
          )}
        </div>

        {children}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          name="nationalID"
          defaultValue={nationalID}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <SubmitButton>Update Profile</SubmitButton>
      </div>
    </form>
  );
}
