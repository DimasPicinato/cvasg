import { useForm } from 'react-hook-form';

import { minNumber } from '@/constants/min-number';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import type { FormProps } from '@/@types/form-props';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export function PoliedroPrismaRetangularForm({ setValue }: FormProps) {
  type FormSchema = z.infer<typeof formSchema>;
  const formSchema = z.object({
    arestaBaseBase: z.coerce
      .number('Insira um número válido!')
      .min(minNumber, `Insira um número maior que ${minNumber}`),
    arestaBaseAltura: z.coerce
      .number('Insira um número válido!')
      .min(minNumber, `Insira um número maior que ${minNumber}`),
    altura: z.coerce.number('Insira um número válido!').min(minNumber, `Insira um número maior que ${minNumber}`),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      arestaBaseBase: 1,
      arestaBaseAltura: 1,
      altura: 1,
    },
  });

  return (
    <Form {...form}>
      <p>
        A<sub>b</sub> = b × c
      </p>
      <p>
        V = A<sub>b</sub> × h
      </p>
      <p>A = 2 × (b × c + b × h + c × h)</p>
      <hr />
      <form
        onSubmit={form.handleSubmit((v: FormSchema) => {
          setValue({
            volume: v.arestaBaseBase * v.arestaBaseAltura * v.altura,
            area:
              2 * (v.arestaBaseBase * v.arestaBaseAltura + v.arestaBaseBase * v.altura + v.arestaBaseAltura * v.altura),
          });
        })}
        className="flex flex-col gap-4"
      >
        <div className="grid grid-cols-2 items-start gap-4">
          <FormField
            control={form.control}
            name="arestaBaseBase"
            render={({ field }) => (
              <FormItem>
                <FormLabel>(b) Base da Aresta da Base</FormLabel>
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
            name="arestaBaseAltura"
            render={({ field }) => (
              <FormItem>
                <FormLabel>(c) Altura da Aresta da Base</FormLabel>
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
              <FormItem className="col-span-2">
                <FormLabel>(h) Altura do Sólido</FormLabel>
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
