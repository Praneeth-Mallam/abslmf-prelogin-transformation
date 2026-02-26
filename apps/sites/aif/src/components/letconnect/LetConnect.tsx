import React, { useState, useEffect ,useRef } from "react";
import styles from "./LetConnect.module.scss";
import Image from "next/image";
import { feature1, feature2, feature3, inputicon } from "../index";
import { countries } from "@/src/data/country";
import { useAccessibility } from "@/src/context/AccessibilityContext";

interface Feature {
  icon: string;
  text: string;
  highlight: string;
  alt: string;
}

const features: Feature[] = [
  {
    icon: feature1,
    text: "PMS & AIF assets cross",
    highlight: "₹23.4 lakh crore",
    alt: "Assets icon",
  },
  {
    icon: feature2,
    text: "Record inflows into",
    highlight: "Category III AIFs",
    alt: "Inflows icon",
  },
  {
    icon: feature3,
    text: "Global money flows into",
    highlight: "India AIFs",
    alt: "Global icon",
  },
];

const LetConnect = () => {
  const [activeTab, setActiveTab] = useState<string>("investor");
  const [message, setMessage] = useState<string>("");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pincode, setPincode] = useState("");
  const [postOffice, setPostOffice] = useState("");
  const [stateName, setStateName] = useState("");
  const [email, setEmail] = useState("");
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);
  const [isLoadingPincode, setIsLoadingPincode] = useState(false);
  const [isExistingInvestor, setIsExistingInvestor] = useState<boolean | null>(
    null,
  );
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const {
    textLevel,
    lineLevel,
    letterLevel,
    hideImages,
    grayscale,
    lowSaturation,
    highlightLinks,
  } = useAccessibility();

  // Log accessibility settings for debugging
  useEffect(() => {
    console.log("Accessibility Settings:", {
      textLevel,
      lineLevel,
      letterLevel,
      hideImages,
      grayscale,
      lowSaturation,
      highlightLinks,
    });
  }, [
    textLevel,
    lineLevel,
    letterLevel,
    hideImages,
    grayscale,
    lowSaturation,
    highlightLinks,
  ]);

  const countryWrapRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
  const onMouseDown = (e: MouseEvent) => {
    if (countryWrapRef.current && !countryWrapRef.current.contains(e.target as Node)) {
      setShowCountryDropdown(false);
    }
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") setShowCountryDropdown(false);
  };

  document.addEventListener("mousedown", onMouseDown);
  document.addEventListener("keydown", onKeyDown);
  return () => {
    document.removeEventListener("mousedown", onMouseDown);
    document.removeEventListener("keydown", onKeyDown);
  };
}, []);

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
    if (words <= 200) {
      setMessage(text);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 12) {
      setPhoneNumber(value);
    }
  };

  const handleCountrySelect = (dialCode: string) => {
    setCountryCode(dialCode);
    setShowCountryDropdown(false);
  };

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    e.currentTarget.style.display = "none";
  };

  const handlePincodeChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value.replace(/\D/g, "");
    setPincode(value);

    if (value.length === 0) {
      setPostOffice("");
      setStateName("");
      setIsLocationEnabled(false);
      return;
    }

    if (value.length !== 6) {
      setIsLocationEnabled(false);
      return;
    }

    if (value.length === 6) {
      setIsLoadingPincode(true);
      try {
        const res = await fetch(
          `https://api.postalpincode.in/pincode/${value}`,
        );
        const data = await res.json();

        if (data[0].Status === "Success" && data[0].PostOffice?.length > 0) {
          const postOffice = data[0].PostOffice[0];
          const postOfficeName = postOffice.Name || postOffice.name || "";
          const state = postOffice.State || postOffice.state || "";

          setPostOffice(postOfficeName);
          setStateName(state);
          setIsLocationEnabled(true);
        } else {
          setPostOffice("");
          setStateName("");
          setIsLocationEnabled(false);
        }
      } catch (error) {
        console.error("Error fetching location data:", error);
        setPostOffice("");
        setStateName("");
        setIsLocationEnabled(false);
      } finally {
        setIsLoadingPincode(false);
      }
    }
  };

  const selectedCountry =
    countries.find((country) => country.dial_code === countryCode) ||
    countries[0];

  const wordCount: number =
    message.trim() === "" ? 0 : message.trim().split(/\s+/).length;

  // Build className string properly
  const sectionClasses = [
    styles.letConnect,
    styles[`textLevel${textLevel}`],
    styles[`lineLevel${lineLevel}`],
    styles[`letterLevel${letterLevel}`],
    grayscale ? styles.grayscale : "",
    lowSaturation ? styles.lowSaturation : "",
    hideImages ? styles.hideImages : "",
    highlightLinks ? styles.highlightLinks : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={sectionClasses}>
      <div className={styles.letConnectLeft}>
        <h2 className={styles.letConnectTitle}>
          We're Here to Help,
          <span className={styles.letConnectTitleBold}>Let's Connect.</span>
        </h2>

        <div className={styles.letConnectFeatures}>
          {features.map((item: Feature, index: number) => (
            <div key={index} className={styles.feature}>
              <div className={styles.featureIcon}>
                <Image
                  src={item.icon}
                  alt={item.alt}
                  width={50}
                  height={50}
                  style={{ display: hideImages ? "none" : "block" }}
                />
              </div>

              <div className={styles.featureContent}>
                <p className={styles.featureText}>{item.text}</p>
                <p className={styles.featureHighlight}>{item.highlight}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.letConnectRight}>
        <div className={styles.userType}>
          <button
            className={`${styles.userTypeBtn} ${activeTab === "investor" ? styles.active : ""}`}
            onClick={() => setActiveTab("investor")}
          >
            I am an Investor
          </button>
          <button
            className={`${styles.userTypeBtn} ${activeTab === "distributor" ? styles.active : ""}`}
            onClick={() => setActiveTab("distributor")}
          >
            I am a Distributor
          </button>
        </div>

        <div className={styles.formContainer}>
          <form className={styles.form}>
            <div className={styles.inputs}>
              <div className={styles.field}>
                <Image
                  src={inputicon}
                  alt=""
                  width={20}
                  height={20}
                  style={{ display: hideImages ? "none" : "block" }}
                />
                <input
                  type="text"
                  placeholder="Name (As per your Aadhar Card)*"
                />
              </div>
              <div className={styles.field}>
                <div className={styles.phoneInputWrapper}>
                  <div className={styles.countrySelector} ref={countryWrapRef}>
                    <button
                      type="button"
                      className={styles.countrySelectorButton}
                      onClick={() =>
                        setShowCountryDropdown(!showCountryDropdown)
                      }
                    >
                      <span className={styles.countryFlag}>
                        {!hideImages && selectedCountry.image ? (
                          <img
                            src={selectedCountry.image}
                            alt={selectedCountry.name}
                            onError={handleImageError}
                            width={20}
                            height={15}
                          />
                        ) : (
                          <span>{selectedCountry.emoji || "🇮🇳"}</span>
                        )}
                      </span>
                      <span className={styles.countryCode}>
                        {selectedCountry.dial_code}
                      </span>
                      <span className={styles.dropdownArrow}>▼</span>
                    </button>

                    {showCountryDropdown && (
                      <div className={styles.countryDropdown}>
                        <div className={styles.countryList}>
                          {countries
                            .filter((country) => country.dial_code)
                            .map((country) => (
                              <button
                                type="button"
                                key={country.code}
                                className={styles.countryOption}
                                onClick={() =>
                                  handleCountrySelect(country.dial_code!)
                                }
                              >
                                <span className={styles.countryFlag}>
                                  {!hideImages && country.image ? (
                                    <img
                                      src={country.image}
                                      alt={country.name}
                                      onError={handleImageError}
                                      width={20}
                                      height={15}
                                    />
                                  ) : (
                                    <span>{country.emoji || "🏳️"}</span>
                                  )}
                                </span>
                                <span className={styles.countryName}>
                                  {country.name}
                                </span>
                                <span className={styles.countryDialCode}>
                                  {country.dial_code}
                                </span>
                              </button>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    className={styles.phoneInput}
                  />
                </div>
              </div>
              <div className={styles.field}>
                <Image
                  src={inputicon}
                  alt=""
                  width={20}
                  height={20}
                  style={{ display: hideImages ? "none" : "block" }}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email Id*"
                />
              </div>
              <div className={styles.field}>
                <Image
                  src={inputicon}
                  alt=""
                  width={20}
                  height={20}
                  style={{ display: hideImages ? "none" : "block" }}
                />
                <input
                  type="text"
                  placeholder="Pin - eg. 326548*"
                  maxLength={6}
                  value={pincode}
                  onChange={handlePincodeChange}
                />
                {isLoadingPincode && (
                  <span className={styles.loading}>Loading...</span>
                )}
              </div>
              <div className={styles.field}>
                <Image
                  src={inputicon}
                  alt=""
                  width={20}
                  height={20}
                  style={{ display: hideImages ? "none" : "block" }}
                />
                <input
                  type="text"
                  placeholder="Enter your city name"
                  value={postOffice}
                  readOnly={true}
                  disabled={!isLocationEnabled || pincode.length === 0}
                  className={
                    !isLocationEnabled || pincode.length === 0
                      ? styles.disabled
                      : ""
                  }
                />
              </div>
              <div className={styles.field}>
                <Image
                  src={inputicon}
                  alt=""
                  width={20}
                  height={20}
                  style={{ display: hideImages ? "none" : "block" }}
                />
                <input
                  type="text"
                  placeholder="Enter your state name"
                  value={stateName}
                  readOnly={true}
                  disabled={!isLocationEnabled || pincode.length === 0}
                  className={
                    !isLocationEnabled || pincode.length === 0
                      ? styles.disabled
                      : ""
                  }
                />
              </div>
            </div>

            {activeTab === "investor" && (
              <div className={styles.product}>
                <p>Product interested in</p>
                <div className={styles.checkboxGroup}>
                  <label className={styles.checkboxLabel}>
                    <input type="checkbox" /> Equity
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input type="checkbox" /> Fixed Income
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input type="checkbox" /> Real Estate
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input type="checkbox" /> GIFT City
                  </label>
                </div>
              </div>
            )}

            <div className={styles.helpSection}>
              <h3>How can we help you?...</h3>
              <div className={styles.textareaWrapper}>
                <textarea
                  placeholder="Type here..."
                  value={message}
                  onChange={handleMessageChange}
                  rows={4}
                />
                <span className={styles.wordCount}>{wordCount}/200 Words</span>
              </div>
            </div>

            <div className={styles.actionButtons}>
              <button type="button" className={styles.actionBtn}>
                Request Product Details
              </button>
              <button type="button" className={styles.actionBtn}>
                Connect With Specialist
              </button>
              <button type="button" className={styles.actionBtn}>
                Schedule a Call
              </button>
            </div>
            <div className={styles.existingInvestorSection}>
              <p className={styles.existingInvestorTitle}>
                Are you an existing investor?
              </p>

              <div className={styles.toggleWrapper}>
                <button
                  type="button"
                  className={`${styles.toggleBtn} ${
                    isExistingInvestor === true ? styles.activeToggle : ""
                  }`}
                  onClick={() => setIsExistingInvestor(true)}
                >
                  Yes
                </button>

                <button
                  type="button"
                  className={`${styles.toggleBtn} ${
                    isExistingInvestor === false ? styles.activeToggle : ""
                  }`}
                  onClick={() => setIsExistingInvestor(false)}
                >
                  No
                </button>
              </div>

              <label className={styles.termsWrapper}>
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                />
                <span>
                  I agree to the{" "}
                  <a href="/terms-and-conditions" target="_blank">
                    Terms and Conditions
                  </a>
                </span>
              </label>
            </div>

            <div className={styles.cta}>
              <button type="submit" className={styles.submitBtn}>
                <p>SEND QUERY</p>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LetConnect;
