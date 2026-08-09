const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const MAX_DAYS = 93;

function getArgument(name) {
  const prefix = `--${name}=`;
  const argument = process.argv.find((value) => value.startsWith(prefix));

  return argument?.slice(prefix.length);
}

function parseDate(value, name) {
  if (!value || !DATE_PATTERN.test(value)) {
    throw new Error(`--${name}=YYYY-MM-DD is required`);
  }

  const date = new Date(`${value}T00:00:00.000Z`);

  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) {
    throw new Error(`--${name} must be a real calendar date`);
  }

  return date;
}

function enumerateDates(from, to) {
  if (from > to) {
    throw new Error("--from must be on or before --to");
  }

  const dates = [];
  const cursor = new Date(from);

  while (cursor <= to) {
    dates.push(cursor.toISOString().slice(0, 10));
    cursor.setUTCDate(cursor.getUTCDate() + 1);

    if (dates.length > MAX_DAYS) {
      throw new Error(`Backfills are limited to ${MAX_DAYS} days per run`);
    }
  }

  return dates;
}

async function main() {
  const from = parseDate(getArgument("from"), "from");
  const to = parseDate(getArgument("to"), "to");
  const offerViewTrackingStart = parseDate(
    getArgument("offer-view-tracking-start"),
    "offer-view-tracking-start"
  );
  const dates = enumerateDates(from, to);
  const apply = process.argv.includes("--apply");
  const baseUrl = (
    getArgument("base-url") ||
    process.env.PRESALES_REPORT_BASE_URL ||
    "https://www.justsummit.co"
  ).replace(/\/$/, "");
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret) {
    throw new Error("CRON_SECRET must be available in the environment");
  }

  console.log(
    `${apply ? "Applying" : "Previewing"} ${dates.length} daily report row(s)`
  );

  for (const date of dates) {
    const offerViewsTracked = date >= offerViewTrackingStart.toISOString().slice(0, 10);
    const searchParams = new URLSearchParams({
      date,
      preview: String(!apply),
      offer_views_tracked: String(offerViewsTracked),
    });
    const response = await fetch(
      `${baseUrl}/api/cron/presales-daily-report?${searchParams}`,
      {
        headers: { authorization: `Bearer ${cronSecret}` },
      }
    );
    const body = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(
        `${date} failed (${response.status}): ${body.detail || body.error || "Unknown error"}`
      );
    }

    console.log(
      JSON.stringify({
        date,
        mode: apply ? "applied" : "preview",
        offer_views: offerViewsTracked ? "tracked" : "not_tracked",
        row: body.row,
      })
    );
  }

  if (!apply) {
    console.log("Preview complete. Re-run the same command with --apply to write rows.");
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
