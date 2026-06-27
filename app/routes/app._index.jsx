import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../shopify.server";
import { useState } from "react";
import styles from "../styles/store-notice.module.css";

export const loader = async ({ request }) => {
  await authenticate.admin(request);

  return null;
};

export default function Index() {
  const [announcement, setAnnouncement] = useState("");
  return (
    <s-page>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Store Notice</h1>
          <p className={styles.subtitle}>
            Create an announcement that will appear across every page
            of your storefront.
          </p>
        </div>
        <div className={styles.card}>
          <label className={styles.label}>
            Announcement Text
          </label>

          <textarea
            className={styles.textarea}
            placeholder="Example: 🚚 Free shipping on orders above ₹999"
            value={announcement}
            maxLength={200}
            onChange={(e) => setAnnouncement(e.target.value)}
          />
          <div className={styles.counter}>
            {announcement.length} / 200 characters
          </div>
          <div className={styles.buttonContainer}>
            <s-button
              variant="primary"
              disabled={announcement.trim().length === 0}
            >
              Save Notice
            </s-button>
          </div>
        </div>
        <div className={styles.infoBox}>
          <strong>How it works</strong>
          <br />
          Saved announcements will be stored in MongoDB and automatically
          synced to Shopify Shop Metafields.
        </div>
      </div>
    </s-page>
  );
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
