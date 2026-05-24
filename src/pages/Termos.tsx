import LegalLayout, { LegalSection } from "@/components/LegalLayout";

const Termos = () => {
  return (
    <LegalLayout
      title="Termos de Serviço"
      description="Termos de Serviço do site de Augusto Dantas — condições de utilização, propriedade intelectual e limitação de responsabilidade."
      path="/termos"
      lastUpdated="25 de maio de 2026"
    >
      <p>
        Os presentes Termos de Serviço regulam o acesso e a utilização do site{" "}
        <strong>dantasdev.pt</strong> (o "Site"), explorado por Augusto Dantas. Ao aceder ou utilizar
        o Site, o visitante declara aceitar integralmente estes Termos. Caso não concorde, deverá
        abster-se de utilizar o Site.
      </p>

      <LegalSection title="1. Objeto">
        <p>
          O Site destina-se à apresentação do portfólio profissional, dos serviços de Web Design e
          desenvolvimento Full Stack e ao estabelecimento de contacto com potenciais clientes. O
          conteúdo tem caráter informativo e não constitui uma proposta contratual vinculativa.
        </p>
      </LegalSection>

      <LegalSection title="2. Utilização do Site">
        <p>O visitante compromete-se a utilizar o Site de forma lícita, abstendo-se de:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Reproduzir, copiar ou distribuir conteúdos sem autorização prévia.</li>
          <li>Introduzir código malicioso ou comprometer a segurança e o funcionamento do Site.</li>
          <li>Utilizar o formulário de contacto para envio de comunicações não solicitadas ou abusivas.</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Propriedade intelectual">
        <p>
          Todos os conteúdos do Site — textos, imagens, logótipos, design, código e demais elementos —
          são propriedade de Augusto Dantas ou de terceiros licenciadores e estão protegidos pela
          legislação de propriedade intelectual. É proibida a sua utilização sem consentimento
          expresso e por escrito.
        </p>
      </LegalSection>

      <LegalSection title="4. Projetos apresentados">
        <p>
          Os projetos exibidos no portfólio são apresentados a título de demonstração. As marcas,
          imagens e conteúdos de clientes pertencem aos respetivos titulares e são apresentados com a
          devida autorização ou para fins ilustrativos do trabalho realizado.
        </p>
      </LegalSection>

      <LegalSection title="5. Limitação de responsabilidade">
        <p>
          O Site é disponibilizado "tal como está". Embora se procure manter a informação atualizada e
          correta, não se garante a ausência de erros ou a disponibilidade ininterrupta do Site.
          Augusto Dantas não se responsabiliza por danos resultantes da utilização ou impossibilidade
          de utilização do Site.
        </p>
      </LegalSection>

      <LegalSection title="6. Ligações para sites de terceiros">
        <p>
          O Site pode conter ligações para sites externos. Não nos responsabilizamos pelo conteúdo,
          políticas ou práticas desses sites, cujo acesso é da inteira responsabilidade do visitante.
        </p>
      </LegalSection>

      <LegalSection title="7. Privacidade">
        <p>
          O tratamento de dados pessoais no âmbito da utilização do Site rege-se pela{" "}
          <a href="/privacidade">Política de Privacidade</a>, que faz parte integrante destes Termos.
        </p>
      </LegalSection>

      <LegalSection title="8. Lei aplicável e foro">
        <p>
          Os presentes Termos regem-se pela lei portuguesa. Para a resolução de quaisquer litígios
          será competente o foro da comarca de Leiria, com renúncia expressa a qualquer outro.
        </p>
      </LegalSection>

      <LegalSection title="9. Contacto">
        <p>
          Para qualquer esclarecimento sobre estes Termos, contacte{" "}
          <a href="mailto:daantadev@gmail.com">daantadev@gmail.com</a>.
        </p>
      </LegalSection>
    </LegalLayout>
  );
};

export default Termos;
