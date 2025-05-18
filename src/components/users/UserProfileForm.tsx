import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface UserProfileFormProps {
  initialData?: {
    name: string;
    avatar?: string;
    bio?: string;
    location?: string;
    website?: string;
    social?: {
      twitter?: string;
      linkedin?: string;
      github?: string;
    };
  };
  onSubmit: (data: {
    name: string;
    avatar?: string;
    bio?: string;
    location?: string;
    website?: string;
    social?: {
      twitter?: string;
      linkedin?: string;
      github?: string;
    };
  }) => void;
  onCancel: () => void;
}

const UserProfileForm = ({
  initialData = {
    name: '',
    bio: '',
    location: '',
    website: '',
    social: {
      twitter: '',
      linkedin: '',
      github: '',
    },
  },
  onSubmit,
  onCancel,
}: UserProfileFormProps) => {
  const [name, setName] = useState(initialData.name);
  const [avatar, setAvatar] = useState(initialData.avatar);
  const [bio, setBio] = useState(initialData.bio);
  const [location, setLocation] = useState(initialData.location);
  const [website, setWebsite] = useState(initialData.website);
  const [social, setSocial] = useState(
    initialData.social || {
      twitter: '',
      linkedin: '',
      github: '',
    }
  );

  const [errors, setErrors] = useState<{
    name?: string;
    website?: string;
    social?: {
      twitter?: string;
      linkedin?: string;
      github?: string;
    };
  }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (website && !website.match(/^https?:\/\/.+/)) {
      newErrors.website = 'Please enter a valid URL';
    }
    if (social.twitter && !social.twitter.match(/^[A-Za-z0-9_]+$/)) {
      newErrors.social = {
        ...newErrors.social,
        twitter: 'Please enter a valid Twitter username',
      };
    }
    if (social.linkedin && !social.linkedin.match(/^[A-Za-z0-9-]+$/)) {
      newErrors.social = {
        ...newErrors.social,
        linkedin: 'Please enter a valid LinkedIn username',
      };
    }
    if (social.github && !social.github.match(/^[A-Za-z0-9-]+$/)) {
      newErrors.social = {
        ...newErrors.social,
        github: 'Please enter a valid GitHub username',
      };
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        name: name.trim(),
        avatar: avatar?.trim(),
        bio: bio?.trim(),
        location: location?.trim(),
        website: website?.trim(),
        social: {
          twitter: social.twitter?.trim(),
          linkedin: social.linkedin?.trim(),
          github: social.github?.trim(),
        },
      });
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="p-6">
        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              className={`w-full p-2 border rounded-md ${
                errors.name
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
              }`}
              placeholder="Enter your name"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 mb-1">
              Avatar URL
            </label>
            <input
              type="url"
              id="avatar"
              value={avatar}
              onChange={e => setAvatar(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter your avatar URL"
            />
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
              Bio
            </label>
            <textarea
              id="bio"
              value={bio}
              onChange={e => setBio(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              rows={4}
              placeholder="Tell us about yourself..."
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={e => setLocation(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter your location"
            />
          </div>

          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
              Website
            </label>
            <input
              type="url"
              id="website"
              value={website}
              onChange={e => setWebsite(e.target.value)}
              className={`w-full p-2 border rounded-md ${
                errors.website
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
              }`}
              placeholder="Enter your website URL"
            />
            {errors.website && <p className="mt-1 text-sm text-red-600">{errors.website}</p>}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Social Links</h3>

            <div>
              <label htmlFor="twitter" className="block text-sm font-medium text-gray-700 mb-1">
                Twitter Username
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                  @
                </span>
                <input
                  type="text"
                  id="twitter"
                  value={social.twitter}
                  onChange={e => setSocial({ ...social, twitter: e.target.value })}
                  className={`flex-1 p-2 border rounded-r-md ${
                    errors.social?.twitter
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
                  }`}
                  placeholder="username"
                />
              </div>
              {errors.social?.twitter && (
                <p className="mt-1 text-sm text-red-600">{errors.social.twitter}</p>
              )}
            </div>

            <div>
              <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">
                LinkedIn Username
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                  linkedin.com/in/
                </span>
                <input
                  type="text"
                  id="linkedin"
                  value={social.linkedin}
                  onChange={e => setSocial({ ...social, linkedin: e.target.value })}
                  className={`flex-1 p-2 border rounded-r-md ${
                    errors.social?.linkedin
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
                  }`}
                  placeholder="username"
                />
              </div>
              {errors.social?.linkedin && (
                <p className="mt-1 text-sm text-red-600">{errors.social.linkedin}</p>
              )}
            </div>

            <div>
              <label htmlFor="github" className="block text-sm font-medium text-gray-700 mb-1">
                GitHub Username
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                  github.com/
                </span>
                <input
                  type="text"
                  id="github"
                  value={social.github}
                  onChange={e => setSocial({ ...social, github: e.target.value })}
                  className={`flex-1 p-2 border rounded-r-md ${
                    errors.social?.github
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
                  }`}
                  placeholder="username"
                />
              </div>
              {errors.social?.github && (
                <p className="mt-1 text-sm text-red-600">{errors.social.github}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Profile
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default UserProfileForm;
