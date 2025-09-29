import { useForm } from 'react-hook-form';

import { minNumber } from '@/constants/min-number';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import type { FormProps } from '@/@types/form-props';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export function CorpoRedondoCilindroForm({ setValue }: FormProps) {
  type FormSchema = z.infer<typeof formSchema>;
  const formSchema = z.object({
    raio: z.coerce.number('Insira um número válido!').min(minNumber, `Insira um número maior que ${minNumber}`),
    altura: z.coerce.number('Insira um número válido!').min(minNumber, `Insira um número maior que ${minNumber}`),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      raio: 1,
      altura: 1,
    },
  });

  return (
    <Form {...form}>
      <p>
        A<sub>b</sub> = π × r<sup>2</sup>
      </p>
      <p>
        V = A<sub>b</sub> × h = π × r<sup>2</sup> × h
      </p>
      <p>A = 2 × π × r × (r + h)</p>
      <hr />
      <form
        onSubmit={form.handleSubmit((v: FormSchema) => {
          setValue({
            volume: Math.PI * Math.pow(v.raio, 2) * v.altura,
            area: 2 * Math.PI * v.raio * (v.raio + v.altura),
          });
        })}
        className="flex flex-col gap-4"
      >
        <div className="grid grid-cols-2 items-start gap-4">
          <FormField
            control={form.control}
            name="raio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>(r) Raio</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...(field as React.ComponentProps<'input'>)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="altura"
            render={({ field }) => (
              <FormItem>
                <FormLabel>(h) Altura</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...(field as React.ComponentProps<'input'>)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button>Calcular</Button>
      </form>
    </Form>
  );
}
