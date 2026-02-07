
"use client";

import { useState } from 'react';
import { useAuth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { CodeXml, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email !== 'afc2c4@gmail.com') {
      toast({
        title: "Acesso Negado",
        description: "Este painel é restrito ao administrador do portfólio.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/admin/posts');
    } catch (error: any) {
      toast({
        title: "Erro no Login",
        description: "E-mail ou senha inválidos.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md shadow-2xl border-none">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-primary-foreground mb-2">
            <Lock className="w-7 h-7" />
          </div>
          <CardTitle className="font-headline text-3xl">Acesso Restrito</CardTitle>
          <CardDescription>Entre com suas credenciais de administrador.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail do Administrador</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="afc2c4@gmail.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Validando..." : "Entrar no Painel"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-2 border-t py-4">
          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Apenas Administradores</p>
          <p className="text-[10px] text-muted-foreground italic">Seu IP foi registrado para segurança.</p>
        </CardFooter>
      </Card>
    </div>
  );
}
