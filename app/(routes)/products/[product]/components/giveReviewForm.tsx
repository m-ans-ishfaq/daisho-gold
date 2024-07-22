"use client";

import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FaStar } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useRouter } from 'next/navigation';
import { getUserById } from '@/app/(routes)/user/server';
import { addReview, addReviewById, deleteReviewById } from '@/app/(routes)/review/server';

type FormValues = {
  stars: number;
  review?: string;
  fullName?: string;
  email?: string;
};

export const ReviewForm = ({ id, productId, rating, review }: { id?: string, productId: string, rating?: number, review?: string }) => {

  const { data: session, status } = useSession();
  const [reviewId, setReviewId] = useState(id);
  const [submitted, setSubmitted] = useState(!!(rating && review));
  const form = useForm<FormValues>({
    defaultValues: {
      stars: (rating && review) ? rating : 5,
      review: (rating && review) ? review : ''
    },
  });

  const { control, handleSubmit, setValue, formState: { errors } } = form;

  const onSubmit = async (data: FormValues) => {
    try {
        if (session?.user && session.user.role == "customer") {
            const res = await addReviewById(session.user.id, productId, data.stars, data.review);
            if (!res) throw new Error();
            setReviewId(JSON.parse(res)._id as string);
        } else {
            const res = await addReview(productId, data.fullName!, data.email!, data.stars, data.review);
            if (!res) throw new Error();
        }
        toast({
          title: "Thanks for your review!",
        });
        setSubmitted(true);
    } catch (err) {
        toast({
            title: "There was an error!",
            variant: 'destructive'
        });
    }
  };

  const deleteReview = async () => {
    try {
        const res = await deleteReviewById(reviewId!);
        console.log(res);
        if (!res) throw new Error();
        setSubmitted(false);
        toast({
            title: "Your review has been deleted successfully!",
        });
    } catch (err) {
        toast({
            title: "There was an error!",
            variant: 'destructive'
        });
    }
  };

  return (
    <div className="max-w-lg w-full mx-auto p-4 md:p-8 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">{submitted ? "Your Review" : "Leave a Review"}</h2>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={control}
            name="stars"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rating</FormLabel>
                <FormControl>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        onClick={() => submitted ? {} : field.onChange(star)}
                        className={`cursor-pointer ${field.value >= star ? 'text-yellow-500' : 'text-neutral-400'}`}
                      />
                    ))}
                  </div>
                </FormControl>
                <FormMessage>
                  {errors.stars && <p className="text-red-500">{errors.stars.message}</p>}
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="review"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Review</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your review here..."
                    {...field}
                    className="min-h-20 max-h-60 mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500"
                    readOnly={submitted}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {(!session || session.user.role !== 'customer') && (
            <>
              <FormField
                control={control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Doe"
                        {...field}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500"
                        readOnly={submitted}
                      />
                    </FormControl>
                    <FormMessage>
                      {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="email@example.com"
                        {...field}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500"
                        readOnly={submitted}
                      />
                    </FormControl>
                    <FormMessage>
                      {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </>
          )}

          {!submitted ? (
            <Button type="submit" className="bg-yellow-500 text-white py-2 px-4 rounded">
              Submit
            </Button>
          ) : <></>}
        </form>
      </Form>
      {submitted ? (
        <Button
            type="button"
            onClick={() => deleteReview()}
            className="bg-red-500 text-white py-2 px-4 rounded mt-4"
        >
            Delete Review
        </Button>
      ) : <></>}
    </div>
  );
};
