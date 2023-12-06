import { apiSlice } from "./apiSlice";

const MESSAGES_URL = "/api/messages";
export const messagesApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		allMessages: builder.mutation({
			query: () => ({
				url: `${MESSAGES_URL}/`,
				method: "GET",
			}),
		}),
		newMessage: builder.mutation({
			query: (data) => ({
				url: `${MESSAGES_URL}/new`,
				method: "POST",
				body: data,
			}),
		}),
	}),
});

export const { useAllMessagesMutation, useNewMessageMutation } =
	messagesApiSlice;
