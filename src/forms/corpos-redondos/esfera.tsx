import { useForm } from 'react-hook-form';

import { minNumber } from '@/constants/min-number';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import type { FormProps } from '@/@types/form-props';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export function CorpoRedondoEsferaForm({ setValue }: FormProps) {
  type FormSchema = z.infer<typeof formSchema>;
  const formSchema = z.object({
    raio: z.coerce.number('Insira um número válido!').min(minNumber, `Insira um número maior que ${minNumber}`),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      raio: 1,
    },
  });

  return (
    <Form {...form}>
      <p>
        V = (4/3) × π × r<sup>3</sup>
      </p>
      <p>
        A = 4 × π × r<sup>2</sup>
      </p>
      <hr />
      <form
        onSubmit={form.handleSubmit((v: FormSchema) => {
          setValue({
            volume: (4 / 3) * Math.PI * Math.pow(v.raio, 3),
            area: 4 * Math.PI * Math.pow(v.raio, 2),
          });
        })}
        className="flex flex-col gap-4"
      >
        <div className="grid grid-cols-2 items-start gap-4">
          <FormField
            control={form.control}
            name="raio"
            render={({ field }) => (
              <FormItem className="col-span-2">
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
        </div>

        <Button>Calcular</Button>
      </form>
    </Form>
  );
}
