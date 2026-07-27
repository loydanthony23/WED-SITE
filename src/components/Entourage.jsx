import { Fragment } from "react";
import { config } from "../lib/config";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

// Small gold caption above a group ("Life God Parents", "To Light Our Path"…)
function GroupTitle({ children }) {
  return (
    <div className="mb-5 flex items-center justify-center gap-3">
      <span className="h-px w-6 shrink-0 bg-gold/40 sm:w-10" />
      <h3 className="text-center font-sans text-[11px] uppercase tracking-[0.2em] text-gold-deep sm:text-xs">
        {children}
      </h3>
      <span className="h-px w-6 shrink-0 bg-gold/40 sm:w-10" />
    </div>
  );
}

const CAPTION =
  "font-sans text-[10px] uppercase tracking-[0.18em] text-gold-deep sm:text-[11px]";

const nameClass = (emphasis) =>
  emphasis
    ? "font-serif text-lg leading-tight text-navy sm:text-2xl"
    : "font-serif text-[15px] leading-tight text-ink sm:text-lg";

// Two mirrored columns — left names flush right, right names flush left, so
// they meet at a centre spine like the printed invitation.
function Columns({ group }) {
  const cls = nameClass(group.emphasis);
  return (
    <div className="mx-auto grid max-w-xl grid-cols-2 items-start gap-x-5 gap-y-2.5 sm:gap-x-12">
      {(group.leftLabel || group.rightLabel) && (
        <>
          <p className={`${CAPTION} text-right`}>{group.leftLabel}</p>
          <p className={`${CAPTION} text-left`}>{group.rightLabel}</p>
        </>
      )}
      {group.pairs.map(([left, right], i) => (
        <Fragment key={i}>
          <p className={`${cls} text-right`}>{left}</p>
          <p className={`${cls} text-left`}>{right}</p>
        </Fragment>
      ))}
    </div>
  );
}

// "To Carry Our Symbol of Love — Jon Marc D. Acaso"
function Roles({ group }) {
  return (
    <div className="mx-auto grid max-w-xl grid-cols-2 items-baseline gap-x-5 gap-y-2.5 sm:gap-x-12">
      {group.roles.map((role, i) => (
        <Fragment key={i}>
          <p className="text-right font-sans text-[11px] leading-snug text-muted sm:text-xs">
            {role.label}
          </p>
          <p className="text-left font-serif text-[15px] leading-tight text-ink sm:text-lg">
            {role.name}
          </p>
        </Fragment>
      ))}
    </div>
  );
}

function Names({ group }) {
  return (
    <ul className="space-y-2 text-center">
      {group.names.map((name, i) => (
        <li key={i} className={nameClass(group.emphasis)}>
          {name}
        </li>
      ))}
    </ul>
  );
}

function Group({ group }) {
  if (group.layout === "roles") return <Roles group={group} />;
  if (group.layout === "list") return <Names group={group} />;
  return <Columns group={group} />;
}

export default function Entourage() {
  const { entourage } = config;
  if (!entourage?.groups?.length) return null;

  return (
    <section id="entourage" className="section-pad bg-sky/40">
      <div className="mx-auto max-w-4xl">
        <SectionHeading kicker={entourage.kicker} title={entourage.title} />

        {entourage.intro && (
          <p className="mx-auto mt-6 max-w-xl text-center font-sans text-sm text-muted">
            {entourage.intro}
          </p>
        )}

        <div className="mt-12 space-y-10 sm:space-y-12">
          {entourage.groups.map((group, i) => (
            <Reveal key={i}>
              <div>
                {group.title && <GroupTitle>{group.title}</GroupTitle>}
                <Group group={group} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
