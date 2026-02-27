/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: aiproducts
 * Interface for AIProducts
 */
export interface AIProducts {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  productName?: string;
  /** @wixFieldType text */
  shortDescription?: string;
  /** @wixFieldType text */
  detailedCapabilities?: string;
  /** @wixFieldType text */
  useCases?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  productImage?: string;
  /** @wixFieldType url */
  videoPreviewUrl?: string;
}


/**
 * Collection ID: applicationareas
 * Interface for ApplicationAreas
 */
export interface ApplicationAreas {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  areaName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  illustration?: string;
  /** @wixFieldType text */
  useCasesSummary?: string;
  /** @wixFieldType url */
  learnMoreUrl?: string;
}


/**
 * Collection ID: industrypartnerships
 * Interface for IndustryPartnerships
 */
export interface IndustryPartnerships {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  partnerName?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  companyLogo?: string;
  /** @wixFieldType text */
  collaborationDescription?: string;
  /** @wixFieldType url */
  partnerWebsite?: string;
  /** @wixFieldType text */
  partnershipType?: string;
}


/**
 * Collection ID: researchupdates
 * Interface for ResearchUpdates
 */
export interface ResearchUpdates {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  researchTitle?: string;
  /** @wixFieldType text */
  abstract?: string;
  /** @wixFieldType date */
  publicationDate?: Date | string;
  /** @wixFieldType text */
  fullArticleContent?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  coverImage?: string;
}
