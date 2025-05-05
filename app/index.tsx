import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Garantir que a navegação ocorra apenas após o layout inicial ser montado
    const timeout = setTimeout(() => {
      router.replace('/login');
    }, 0); // Usamos o setTimeout para garantir que a navegação ocorra após o primeiro render

    return () => clearTimeout(timeout); // Limpeza do timeout, caso o componente seja desmontado
  }, [router]);

  return null; // Não exibe nada enquanto redireciona
}
