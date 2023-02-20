import { component$ } from "@builder.io/qwik";
import { action$, Form, z, zod$ } from "@builder.io/qwik-city";
import { supabase } from "~/server/supabase/db";
import { getBaseUrl } from "~/utils/getBaseUrl";
import { paths } from "~/utils/paths";

export const useSignUp = action$(
  async (data, event) => {
    const emailRedirectTo = `${getBaseUrl()}${paths.callback}`;
    const result = await supabase.auth.signUp({
      ...data,
      options: { emailRedirectTo },
    });

    if (result.error) {
      const status = result.error.status || 400;
      return event.fail(status, {
        formErrors: [result.error.message],
      });
    }

    event.redirect(302, paths.confirm)
  },
  zod$({
    email: z.string().email(),
    password: z.string(),
  })
);

export const RegisterForm = component$(() => {
  const action = useSignUp()

  return (
    <Form class="flex flex-col gap-2" action={action}>
      <h2 class="text-xl">Sign up with password</h2>

      <div class="form-control w-full">
        <label for="email" class="label">
          <span class="label-text">Email</span>
        </label>
        <input
          class="input input-bordered w-full"
          placeholder="Email"
          id="email"
          name="email"
          type="email"
        />
        <span class="label text-red-500">
          {action.value?.fieldErrors?.email?.[0]}
        </span>
      </div>

      <div class="form-control w-full">
        <label for="password" class="label">
          <span class="label-text">Password</span>
        </label>
        <input
          class="input input-bordered w-full"
          id="password"
          name="password"
          type="password"
        />
        <span class="label text-red-500">
          {action.value?.fieldErrors?.password?.[0]}
        </span>
      </div>

      <span class="label text-red-500">{action.value?.formErrors?.[0]}</span>
      <button class={"btn btn-primary mt-2"} type="submit">
        Sign Up
      </button>
    </Form>
  );
});
