"use client";

import React, { useState, useEffect } from "react";
import DolarChart from "@/components/DolarChart";
import DolarDatePicker from "@/components/DolarDatePicker";
import { format } from "date-fns";
import { DateRangeProp } from "@/types/custom";

export default function DolarPage() {
  const [dateRange, setDateRange] = useState<DateRangeProp>({
    from: "",
    to: "",
  });

  useEffect(() => {
    const currentDate = new Date();
    const sevenDaysAgo = new Date(currentDate);
    sevenDaysAgo.setDate(currentDate.getDate() - 30);

    const initialDateRange = {
      from: format(sevenDaysAgo, "yyyy-MM-dd"),
      to: format(currentDate, "yyyy-MM-dd"),
    };

    setDateRange(initialDateRange);
  }, []);

  return (
    // <section className="mt-12 w-full max-w-4xl mx-auto flex flex-col justify-center p-8 gap-4">
    <section className="flex flex-col gap-4">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Dolar
      </h1>
      <DolarDatePicker setDateRange={setDateRange} />
      {dateRange && <DolarChart dateRange={dateRange} />}
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat quis
        unde quibusdam aliquam tempore ea perspiciatis sint eos consequuntur,
        cum totam neque deleniti laudantium officia necessitatibus magnam?
        Repellendus, fuga id! Quod aliquid, ratione, culpa accusantium quisquam
        voluptate aspernatur assumenda nostrum aliquam voluptatem officia
        pariatur, necessitatibus similique cumque quasi dolorum ipsum harum
        eaque fugit sit distinctio eveniet eos! Distinctio, molestiae
        voluptatum. Voluptate unde odio, vel ullam nulla est adipisci ut a eum
        quam consectetur esse soluta dignissimos suscipit fuga dolore distinctio
        reprehenderit enim nesciunt ipsa! At, sint. Minus odit est delectus. Qui
        cum eveniet, voluptatem error accusamus beatae nisi, enim autem nobis
        totam minus laudantium optio expedita nihil et asperiores assumenda
        rerum. Laboriosam fugiat error aspernatur. Suscipit aut nisi ea illo?
        Atque expedita ipsam labore quasi. Corrupti asperiores neque rem
        voluptate et dolorem aut, in sint, voluptatum itaque nesciunt hic
        expedita recusandae provident adipisci facilis maxime perferendis iure
        est quaerat vitae. Quod rem eos quaerat at, distinctio veritatis odit
        sapiente. Assumenda, enim explicabo mollitia repellat facilis officiis
        eveniet itaque, libero, sapiente error tempore neque? Fuga porro
        recusandae ut pariatur, itaque tempora. Nobis numquam enim quos
        inventore nostrum, cupiditate magnam. Ullam tempore voluptas sequi cum
        ad magni tenetur ipsum quaerat? Ducimus quae consectetur provident nam
        dolorem hic tempora vitae porro eum aperiam. Eum qui natus quis quasi
        mollitia nostrum quibusdam recusandae alias laudantium, inventore
        tempora, voluptate aliquam ea ex tenetur ducimus, eaque cumque in amet
        architecto optio ipsa nobis? Id, amet eveniet! Beatae, quasi eaque
        libero mollitia quas pariatur delectus, esse exercitationem natus a sunt
        omnis veniam reiciendis, odit asperiores temporibus porro! Itaque
        doloribus delectus eaque a omnis aut quo id praesentium? Mollitia
        ducimus ratione voluptatum sit soluta dolor quae numquam vitae eligendi
        minus dolorem quibusdam optio nesciunt vel in velit inventore, veritatis
        odit odio. Praesentium fuga dolorem aspernatur ipsam totam sint!
      </p>
    </section>
  );
}
