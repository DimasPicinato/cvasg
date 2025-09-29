import { useState } from 'react';

import { PoliedroPiramideHexagonoRegularForm } from './forms/poliedro/piramide/hexagono-regular';
import { PoliedroPiramideQuadradaForm } from './forms/poliedro/piramide/quadrada';
import { PoliedroPiramideRetangularForm } from './forms/poliedro/piramide/retangular';
import { PoliedroPiramideTriangularEquilateroForm } from './forms/poliedro/piramide/triangular-equilatero';
import { PoliedroPiramideTriangularEscalenoForm } from './forms/poliedro/piramide/triangular-escaleno';
import { PoliedroPiramideTriangularIsoscelesForm } from './forms/poliedro/piramide/triangular-isosceles';
import { PoliedroPrismaHexagonoRegularForm } from './forms/poliedro/prisma/hexagono-regular';
import { PoliedroPrismaQuadradaForm } from './forms/poliedro/prisma/quadrada';
import { PoliedroPrismaRetangularForm } from './forms/poliedro/prisma/retangular';
import { PoliedroPrismaTriangularEquilateroForm } from './forms/poliedro/prisma/triangular-equilatero';
import { PoliedroPrismaTriangularEscalenoForm } from './forms/poliedro/prisma/triangular-escaleno';
import { PoliedroPrismaTriangularIsoscelesForm } from './forms/poliedro/prisma/triangular-isosceles';

import { Button } from './components/ui/button';

export function App() {
  const [solidoGeometrico, setSolidoGeometrico] = useState<'poliedro' | 'corpoRedondo' | null>(null);
  const [poliedroType, setPoliedroType] = useState<'prisma' | 'piramide' | null>(null);
  const [corpoRedondoType, setCorpoRedondoType] = useState<'cilindro' | 'cone' | 'esfera' | null>(null);
  const [poliedroBase, setPoliedroBase] = useState<
    | 'quadrada'
    | 'retangular'
    | 'triangularEquilatero'
    | 'triangularIsosceles'
    | 'triangularEscaleno'
    | 'hexagonoRegular'
    | null
  >(null);
  const [value, setValue] = useState<{ volume: number; area: number } | null>(null);

  return (
    <div className="flex min-h-[100dvh] w-full flex-col items-center gap-8">
      <header className="bg-foreground text-background flex w-full flex-col items-center gap-2 p-4">
        <h2>Trabalho de Matemática</h2>
        <h5>Cálculo de volumes de formas geométricas tridimensionais.</h5>
      </header>

      <div className="flex h-full flex-1 flex-col gap-4">
        <div className="flex flex-col">
          <h4>Selecione o tipo de sólido geométrico:</h4>
          <div className="flex items-center gap-2">
            <Button
              variant={solidoGeometrico === 'poliedro' ? 'default' : 'outline'}
              onClick={() => setSolidoGeometrico('poliedro')}
            >
              Poliedro
            </Button>
            <Button
              variant={solidoGeometrico === 'corpoRedondo' ? 'default' : 'outline'}
              onClick={() => setSolidoGeometrico('corpoRedondo')}
            >
              Corpo Redondo
            </Button>
          </div>
        </div>

        {solidoGeometrico === 'poliedro' && (
          <>
            <div className="flex flex-col">
              <h4>Selecione o tipo de poliedro:</h4>
              <div className="flex items-center gap-2">
                <Button
                  variant={poliedroType === 'prisma' ? 'default' : 'outline'}
                  onClick={() => setPoliedroType('prisma')}
                >
                  Prisma
                </Button>
                <Button
                  variant={poliedroType === 'piramide' ? 'default' : 'outline'}
                  onClick={() => setPoliedroType('piramide')}
                >
                  Pirâmide
                </Button>
              </div>
            </div>

            {poliedroType && (
              <div className="flex flex-col">
                <h4>Selecione a base do poliedro:</h4>
                <div className="flex items-center gap-2">
                  <Button
                    variant={poliedroBase === 'quadrada' ? 'default' : 'outline'}
                    onClick={() => setPoliedroBase('quadrada')}
                  >
                    Quadrada
                  </Button>
                  <Button
                    variant={poliedroBase === 'retangular' ? 'default' : 'outline'}
                    onClick={() => setPoliedroBase('retangular')}
                  >
                    Retangular
                  </Button>
                  <Button
                    variant={poliedroBase === 'triangularEquilatero' ? 'default' : 'outline'}
                    onClick={() => setPoliedroBase('triangularEquilatero')}
                  >
                    Triângulo Equilátero
                  </Button>
                  <Button
                    variant={poliedroBase === 'triangularIsosceles' ? 'default' : 'outline'}
                    onClick={() => setPoliedroBase('triangularIsosceles')}
                  >
                    Triângulo Isósceles
                  </Button>
                  <Button
                    variant={poliedroBase === 'triangularEscaleno' ? 'default' : 'outline'}
                    onClick={() => setPoliedroBase('triangularEscaleno')}
                  >
                    Triângulo Escaleno
                  </Button>
                </div>
              </div>
            )}
          </>
        )}

        {solidoGeometrico === 'corpoRedondo' && (
          <div className="flex flex-col">
            <h4>Selecione o tipo de corpo redondo:</h4>
            <div className="flex items-center gap-2">
              <Button
                variant={corpoRedondoType === 'cilindro' ? 'default' : 'outline'}
                onClick={() => setCorpoRedondoType('cilindro')}
              >
                Cilindro
              </Button>
              <Button
                variant={corpoRedondoType === 'cone' ? 'default' : 'outline'}
                onClick={() => setCorpoRedondoType('cone')}
              >
                Cone
              </Button>
              <Button
                variant={corpoRedondoType === 'esfera' ? 'default' : 'outline'}
                onClick={() => setCorpoRedondoType('esfera')}
              >
                Esfera
              </Button>
            </div>
          </div>
        )}

        <hr />

        {(() => {
          switch (poliedroType) {
            case 'prisma':
              switch (poliedroBase) {
                case 'quadrada':
                  return <PoliedroPrismaQuadradaForm setValue={setValue} />;
                case 'retangular':
                  return <PoliedroPrismaRetangularForm setValue={setValue} />;
                case 'triangularEquilatero':
                  return <PoliedroPrismaTriangularEquilateroForm setValue={setValue} />;
                case 'triangularIsosceles':
                  return <PoliedroPrismaTriangularIsoscelesForm setValue={setValue} />;
                case 'triangularEscaleno':
                  return <PoliedroPrismaTriangularEscalenoForm setValue={setValue} />;
                case 'hexagonoRegular':
                  return <PoliedroPrismaHexagonoRegularForm setValue={setValue} />;
              }
              return;

            case 'piramide':
              switch (poliedroBase) {
                case 'quadrada':
                  return <PoliedroPiramideQuadradaForm setValue={setValue} />;
                case 'retangular':
                  return <PoliedroPiramideRetangularForm setValue={setValue} />;
                case 'triangularEquilatero':
                  return <PoliedroPiramideTriangularEquilateroForm setValue={setValue} />;
                case 'triangularIsosceles':
                  return <PoliedroPiramideTriangularIsoscelesForm setValue={setValue} />;
                case 'triangularEscaleno':
                  return <PoliedroPiramideTriangularEscalenoForm setValue={setValue} />;
                case 'hexagonoRegular':
                  return <PoliedroPiramideHexagonoRegularForm setValue={setValue} />;
              }
              return;
          }

          switch (corpoRedondoType) {
            case 'cilindro':
              return <CorpoRedondoCilindroForm setValue={setValue} />;
            case 'cone':
              return <CorpoRedondoConeForm setValue={setValue} />;
            case 'esfera':
              return <CorpoRedondoEsferaForm setValue={setValue} />;
          }
        })()}

        {value && (
          <>
            <hr />
            <div className="flex flex-col gap-2">
              <h3>
                Volume: {value.volume}cm<sup>3</sup>
                Área: {value.area}cm<sup>2</sup>
              </h3>
            </div>
          </>
        )}
      </div>

      <footer className="bg-foreground text-background flex w-full flex-col items-center gap-2 p-4">
        <h5>Por: Dimas Picinato, Marco Antônio e Ryan Gabriel Marco Antônio</h5>
      </footer>
    </div>
  );
}
