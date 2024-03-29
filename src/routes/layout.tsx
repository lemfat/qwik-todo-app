import { component$, Slot } from '@builder.io/qwik';
import Footer from '~/components/footer';
import Header from '~/components/header';

export default component$(() => {
  return (
    <div class="min-h-screen flex flex-col">
      <Header />
      <main class="bg-blue-50 p-10 flex-grow overflow-hidden">
        <Slot />
      </main>
      <Footer />
    </div>
  );
});
