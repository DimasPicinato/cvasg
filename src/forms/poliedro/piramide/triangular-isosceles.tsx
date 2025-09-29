import { useForm } from 'react-hook-form';

import { minNumber } from '@/constants/min-number';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import type { FormProps } from '@/@types/form-props';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export function PoliedroPiramideTriangularIsoscelesForm({ setValue }: FormProps) {
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
        A<sub>b</sub> = (b × c) / 2
      </p>
      <p>
        V = (A<sub>b</sub> × h) / 3
      </p>
      <p>
        A = A<sub>b</sub> + ((b + 2 × √(h<sup>2</sup> + (c / 2)<sup>2</sup>)) × h) / 2
      </p>
      <hr />
      <form
        onSubmit={form.handleSubmit((v: FormSchema) => {
          const baseArea = (v.arestaBaseBase * v.arestaBaseAltura) / 2;
          setValue({
            volume: (baseArea * v.altura) / 3,
            area:
              baseArea +
              ((v.arestaBaseBase + 2 * Math.sqrt(Math.pow(v.altura, 2) + Math.pow(v.arestaBaseAltura / 2, 2))) *
                v.altura) /
                2,
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
