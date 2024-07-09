import { useRouter } from 'next/router';

function useSearchParams() {
  const router = useRouter();

  return new URLSearchParams(router.query);
}

export default useSearchParams;
