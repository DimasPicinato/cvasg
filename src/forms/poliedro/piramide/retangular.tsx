import { useForm } from 'react-hook-form';

import { minNumber } from '@/constants/min-number';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import type { FormProps } from '@/@types/form-props';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export function PoliedroPiramideRetangularForm({ setValue }: FormProps) {
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
      <form
        onSubmit={form.handleSubmit((v: FormSchema) => {
          const baseArea = v.arestaBaseBase * v.arestaBaseAltura;
          setValue({
            volume: (baseArea * v.altura) / 3,
            area:
              baseArea +
              ((v.arestaBaseBase + v.arestaBaseAltura) *
                (Math.sqrt(Math.pow(v.altura, 2) + Math.pow(v.arestaBaseAltura / 2, 2)) +
                  Math.sqrt(Math.pow(v.altura, 2) + Math.pow(v.arestaBaseBase / 2, 2)))) /
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
                <FormLabel>Base da Aresta da Base (cm)</FormLabel>
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
                <FormLabel>Altura da Aresta da Base (cm)</FormLabel>
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
                <FormLabel>Altura do Sólido (cm)</FormLabel>
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
