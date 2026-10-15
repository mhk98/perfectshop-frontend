import { SiteFooter, SiteHeader, getSiteSettings } from "@/components/SiteChrome";
import ContactClient from "./ContactClient";

export default async function ContactPage() {
  const settings = await getSiteSettings();
  return (
<<<<<<< HEAD
    <ContactClient
      header={<SiteHeader />}
      footer={<SiteFooter />}
      initialSettings={settings}
    />
=======
    <svg
      width="24"
      height="24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.34 11a19.79 19.79 0 01-3.07-8.67A2 2 0 012.25 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
    </svg>
  );
}

function ContactCard({ item }: { item: ContactItem }) {
  const content = (
    <>
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: 12,
          background: item.bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <ContactIcon icon={item.icon} color={item.color} />
      </div>
      <div style={{ minWidth: 0 }}>
        <p style={{ fontSize: 12, color: "#9ca3af", marginBottom: 3 }}>
          {item.label}
        </p>
        <p
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "#111827",
            lineHeight: 1.4,
            wordBreak: "break-word",
          }}
        >
          {item.value}
        </p>
        {item.sub && (
          <p style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>
            {item.sub}
          </p>
        )}
      </div>
    </>
  );

  const style = {
    background: "#fff",
    borderRadius: 16,
    padding: "20px 24px",
    display: "flex",
    alignItems: "center",
    gap: 16,
    boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
    textDecoration: "none",
  };

  if (!item.href) return <div style={style}>{content}</div>;

  return (
    <a
      href={item.href}
      target={item.target}
      rel={item.target ? "noopener noreferrer" : undefined}
      style={style}
    >
      {content}
    </a>
  );
}

export default function ContactPage() {
  const [settings, setSettings] = useState<SiteSetting | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSiteSettings()
      .then(setSettings)
      .catch(() => setSettings(null))
      .finally(() => setLoading(false));
  }, []);

  const contactItems = useMemo<ContactItem[]>(() => {
    const phone = clean(settings?.phoneNumber || settings?.phone);
    const hotline = clean(settings?.hotlineNumber);
    const email = clean(settings?.email);
    const hotMail = clean(settings?.hotMail);
    const address = clean(settings?.address);
    const mapLink = clean(settings?.mapLink);
    const whatsappNumber = clean(
      settings?.whatsappNumber || settings?.phoneNumber || settings?.phone,
    );
    const whatsappUrl =
      waUrlFromPhone(whatsappNumber) || clean(settings?.whatsappUrl);

    return [
      phone && {
        key: "phone",
        label: "ফোন",
        value: phone,
        href: `tel:${phone}`,
        bg: "#eff6ff",
        color: "#B7791F",
        icon: "phone" as const,
      },
      hotline && {
        key: "hotline",
        label: "হটলাইন",
        value: hotline,
        href: `tel:${hotline}`,
        bg: "#fef3c7",
        color: "#d97706",
        icon: "phone" as const,
      },
      email && {
        key: "email",
        label: "ইমেইল",
        value: email,
        href: `mailto:${email}`,
        bg: "#fef2f2",
        color: "#1A1A1A",
        icon: "mail" as const,
      },
      hotMail && {
        key: "hotMail",
        label: "হট মেইল",
        value: hotMail,
        href: `mailto:${hotMail}`,
        bg: "#fdf2f8",
        color: "#db2777",
        icon: "mail" as const,
      },
      address && {
        key: "address",
        label: "ঠিকানা",
        value: address,
        href:
          mapLink ||
          `https://maps.google.com/?q=${encodeURIComponent(address)}`,
        target: "_blank",
        bg: "#f0fdf4",
        color: "#16a34a",
        icon: "map" as const,
      },
      whatsappNumber && {
        key: "whatsapp",
        label: "WhatsApp",
        value: whatsappNumber,
        sub: "মেসেজ করুন",
        href: whatsappUrl,
        target: "_blank",
        bg: "#f0fdf4",
        color: "#25d366",
        icon: "whatsapp" as const,
      },
    ].filter(Boolean) as ContactItem[];
  }, [settings]);

  const mapLink = clean(settings?.mapLink);
  const hasContact = contactItems.length > 0;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <MarqueeBanner text={settings?.marqueeText ?? null} />
      <Header logoUrl={settings?.logoUrl ?? null} />
      <main className="flex-1 py-10">
        <div style={{ width: "90%", maxWidth: 980, margin: "40px auto 40px" }}>
          <h1
            style={{
              fontSize: 26,
              fontWeight: 800,
              color: "#1f2937",
              marginBottom: 4,
            }}
          >
            যোগাযোগ করুন
          </h1>
          <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 32 }}>
            আমাদের সাথে যেকোনো প্রশ্ন বা সমস্যায় যোগাযোগ করুন।
          </p>

          {loading && (
            <div
              style={{
                background: "#fff",
                borderRadius: 16,
                padding: 24,
                color: "#6b7280",
                fontSize: 14,
              }}
            >
              Loading contact information...
            </div>
          )}

          {!loading && !hasContact && (
            <div
              style={{
                background: "#fff",
                borderRadius: 16,
                padding: 24,
                color: "#6b7280",
                fontSize: 14,
              }}
            >
              Contact information is not available right now.
            </div>
          )}

          {hasContact && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: 16,
                marginBottom: 24,
              }}
            >
              {contactItems.map((item) => (
                <ContactCard key={item.key} item={item} />
              ))}
            </div>
          )}

          {mapLink && (
            <div
              style={{
                background: "#fff",
                borderRadius: 16,
                padding: 24,
                boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
              }}
            >
              <h2
                style={{
                  fontSize: 15,
                  fontWeight: 800,
                  color: "#111827",
                  marginBottom: 12,
                }}
              >
                লোকেশন
              </h2>
              <a
                href={mapLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 42,
                  padding: "0 18px",
                  borderRadius: 8,
                  background: "#FFC107",
                  color: "#1A1A1A",
                  fontSize: 14,
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Google Map খুলুন
              </a>
            </div>
          )}
        </div>
      </main>
      <Footer settings={settings} />
      <FloatingContact settings={settings} />
    </div>
>>>>>>> e349dbe0156ebb8b988549348380147ece43e013
  );
}
