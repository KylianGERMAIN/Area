import {auth} from "../firebase-config";
import {signInWithPopup} from "firebase/auth";
import httpRequest from "../Functions/requestHttp";
import {useNavigate} from "react-router";
import {FaFacebook} from "react-icons/fa";
import {FcGoogle} from "react-icons/fc";
import {BsGithub} from "react-icons/bs";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";

import {Button, Box, Flex} from "@chakra-ui/react";

const SocialsButton = () => {
  const facebookProvider = new FacebookAuthProvider();
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const navigate = useNavigate();

  const signInWithOAuth = (provider, authname) => {
    switch (authname) {
      case "google":
        provider.addScope(
          "profile",
          "email",
          "https://www.googleapis.com/auth/cloud-platform",
          "https://www.googleapis.com/auth/cloud-platform.read-only",
          "https://www.googleapis.com/auth/adexchange.buyer",
          "https://www.googleapis.com/auth/adexchange.buyer",
          "https://www.googleapis.com/auth/admob.readonly",
          "https://www.googleapis.com/auth/admob.report",
          "https://www.googleapis.com/auth/adsensehost",
          "https://www.googleapis.com/auth/adsense",
          "https://www.googleapis.com/auth/adsense.readonly",
          "https://www.googleapis.com/auth/admin.datatransfer",
          "https://www.googleapis.com/auth/admin.datatransfer.readonly",
          "https://www.googleapis.com/auth/admin.directory.customer",
          "https://www.googleapis.com/auth/admin.directory.customer.readonly",
          "https://www.googleapis.com/auth/admin.directory.device.chromeos",
          "https://www.googleapis.com/auth/admin.directory.device.chromeos.readonly",
          "https://www.googleapis.com/auth/admin.directory.device.mobile",
          "https://www.googleapis.com/auth/admin.directory.device.mobile.action",
          "https://www.googleapis.com/auth/admin.directory.device.mobile.readonly",
          "https://www.googleapis.com/auth/admin.directory.domain",
          "https://www.googleapis.com/auth/admin.directory.domain.readonly",
          "https://www.googleapis.com/auth/admin.directory.group",
          "https://www.googleapis.com/auth/admin.directory.group.member",
          "https://www.googleapis.com/auth/admin.directory.group.member.readonly",
          "https://www.googleapis.com/auth/admin.directory.group.readonly",
          "https://www.googleapis.com/auth/admin.directory.orgunit",
          "https://www.googleapis.com/auth/admin.directory.orgunit.readonly",
          "https://www.googleapis.com/auth/admin.directory.resource.calendar",
          "https://www.googleapis.com/auth/admin.directory.resource.calendar.readonly",
          "https://www.googleapis.com/auth/admin.directory.rolemanagement",
          "https://www.googleapis.com/auth/admin.directory.rolemanagement.readonly",
          "https://www.googleapis.com/auth/admin.directory.user",
          "https://www.googleapis.com/auth/admin.directory.user.alias",
          "https://www.googleapis.com/auth/admin.directory.user.alias.readonly",
          "https://www.googleapis.com/auth/admin.directory.user.readonly",
          "https://www.googleapis.com/auth/admin.directory.user.security",
          "https://www.googleapis.com/auth/admin.directory.user",
          "https://www.googleapis.com/auth/admin.directory.user.alias",
          "https://www.googleapis.com/auth/admin.directory.user.alias.readonly",
          "https://www.googleapis.com/auth/admin.directory.user.readonly",
          "https://www.googleapis.com/auth/admin.directory.user.security",
          "https://www.googleapis.com/auth/admin.directory.userschema",
          "https://www.googleapis.com/auth/admin.directory.userschema.readonly",
          "https://www.googleapis.com/auth/admin.reports.audit.readonly",
          "https://www.googleapis.com/auth/admin.reports.usage.readonly",
          "https://www.googleapis.com/auth/analytics",
          "https://www.googleapis.com/auth/analytics.readonly",
          "https://www.googleapis.com/auth/androidmanagement",
          "https://www.googleapis.com/auth/appengine.admin",
          "https://mail.google.com/",
          "https://www.googleapis.com/auth/gmail.addons.current.action.compose",
          "https://www.googleapis.com/auth/gmail.addons.current.message.action",
          "https://www.googleapis.com/auth/gmail.addons.current.message,.metadata",
          "https://www.googleapis.com/auth/gmail.addons.current.message.readonly",
          "https://www.googleapis.com/auth/gmail.compose",
          "https://www.googleapis.com/auth/gmail.insert",
          "https://www.googleapis.com/auth/gmail.labels",
          "https://www.googleapis.com/auth/gmail.metadata",
          "https://www.googleapis.com/auth/gmail.modify",
          "https://www.googleapis.com/auth/gmail.readonly",
          "https://www.googleapis.com/auth/gmail.send",
          "https://www.googleapis.com/auth/gmail.settings.basic",
          "https://www.googleapis.com/auth/gmail.settings.sharing",
          "https://www.googleapis.com/auth/analytics.edit",
          "https://www.googleapis.com/auth/analytics.manage.users",
          "https://www.googleapis.com/auth/analytics.manage.users.readonly",
          "https://www.googleapis.com/auth/analytics.provision",
          "https://www.googleapis.com/auth/analytics.user.deletion",
          "https://www.googleapis.com/auth/classroom.announcements",
          "https://www.googleapis.com/auth/classroom.announcements.readonly",
          "https://www.googleapis.com/auth/classroom.courses",
          "https://www.googleapis.com/auth/classroom.courses.readonly",
          "https://www.googleapis.com/auth/classroom.coursework.me",
          "https://www.googleapis.com/auth/classroom.coursework.me.readonly",
          "https://www.googleapis.com/auth/classroom.coursework.students",
          "https://www.googleapis.com/auth/classroom.coursework.students.readonly",
          "https://www.googleapis.com/auth/classroom.courseworkmaterials",
          "https://www.googleapis.com/auth/classroom.courseworkmaterials.readonly",
          "https://www.googleapis.com/auth/classroom.guardianlinks.me.readonly",
          "https://www.googleapis.com/auth/classroom.guardianlinks.students",
          "https://www.googleapis.com/auth/classroom.guardianlinks.students.readonly",
          "https://www.googleapis.com/auth/classroom.profile.emails",
          "https://www.googleapis.com/auth/classroom.profile.photos",
          "https://www.googleapis.com/auth/classroom.push-notifications",
          "https://www.googleapis.com/auth/classroom.rosters",
          "https://www.googleapis.com/auth/classroom.rosters.readonly",
          "https://www.googleapis.com/auth/classroom.student-submissions.me.readonly",
          "https://www.googleapis.com/auth/classroom.student-submissions.students.readonly",
          "https://www.googleapis.com/auth/classroom.topics",
          "https://www.googleapis.com/auth/classroom.topics.readonly",
          "https://www.googleapis.com/auth/documents",
          "https://www.googleapis.com/auth/documents.readonly",
          "https://www.googleapis.com/auth/drive",
          "https://www.googleapis.com/auth/drive.file",
          "https://www.googleapis.com/auth/drive.readonly",
          "https://www.googleapis.com/auth/firebase",
          "https://www.googleapis.com/auth/androidpublisher",
          "https://www.googleapis.com/auth/androidenterprise",
          "https://www.googleapis.com/auth/games",
          "https://www.googleapis.com/auth/drive.appdata",
          "https://www.googleapis.com/auth/webmasters",
          "https://www.googleapis.com/auth/webmasters.readonly",
          "https://www.googleapis.com/auth/spreadsheets",
          "https://www.googleapis.com/auth/spreadsheets.readonly",
          "openid",
          "https://www.googleapis.com/auth/siteverification",
          "https://www.googleapis.com/auth/siteverification.verify_only",
          "https://www.googleapis.com/auth/presentations",
          "https://www.googleapis.com/auth/presentations.readonly",
          "https://www.googleapis.com/auth/apps.alerts",
          "https://www.googleapis.com/auth/apps.order",
          "https://www.googleapis.com/auth/apps.order.readonly",
          "https://www.googleapis.com/auth/apps.groups.migration",
          "https://www.googleapis.com/auth/apps.groups.settings",
          "https://www.googleapis.com/auth/homegraph",
          "https://www.googleapis.com/auth/indexing",
          "https://www.googleapis.com/auth/manufacturercenter",
          "https://www.googleapis.com/auth/contacts",
          "https://www.googleapis.com/auth/contacts.other.readonly",
          "https://www.googleapis.com/auth/contacts.readonly",
          "https://www.googleapis.com/auth/directory.readonly",
          "https://www.googleapis.com/auth/user.addresses.read",
          "https://www.googleapis.com/auth/user.birthday.read",
          "https://www.googleapis.com/auth/user.emails.read",
          "https://www.googleapis.com/auth/user.gender.read",
          "https://www.googleapis.com/auth/user.organization.read",
          "https://www.googleapis.com/auth/user.phonenumbers.read",
          "https://www.googleapis.com/auth/userinfo.email",
          "https://www.googleapis.com/auth/userinfo.profile",
          "https://www.googleapis.com/auth/photoslibrary",
          "https://www.googleapis.com/auth/photoslibrary.appendonly",
          "https://www.googleapis.com/auth/photoslibrary.edit.appcreateddata",
          "https://www.googleapis.com/auth/photoslibrary.readonly",
          "https://www.googleapis.com/auth/photoslibrary.readonly.appcreateddata",
          "https://www.googleapis.com/auth/photoslibrary.sharing",
          "https://www.googleapis.com/auth/doubleclicksearch",
          "https://www.googleapis.com/auth/service.management",
          "https://www.googleapis.com/auth/service.management.readonly",
          "https://www.googleapis.com/auth/monitoring",
          "https://www.googleapis.com/auth/monitoring.write",
          "https://www.googleapis.com/auth/streetviewpublish",
          "https://www.googleapis.com/auth/tagmanager.delete.containers",
          "https://www.googleapis.com/auth/tagmanager.edit.containers",
          "https://www.googleapis.com/auth/tagmanager.edit.containerversions",
          "https://www.googleapis.com/auth/tagmanager.manage.accounts",
          "https://www.googleapis.com/auth/tagmanager.manage.users",
          "https://www.googleapis.com/auth/tagmanager.publish",
          "https://www.googleapis.com/auth/tagmanager.readonly",
          "https://www.googleapis.com/auth/tasks",
          "https://www.googleapis.com/auth/tasks.readonly",
          "https://www.googleapis.com/auth/youtube",
          "https://www.googleapis.com/auth/youtube.readonly",
          "https://www.googleapis.com/auth/youtubepartner",
          "https://www.googleapis.com/auth/yt-analytics.readonly",
          "https://www.googleapis.com/auth/youtube.channel-memberships.creator",
          "https://www.googleapis.com/auth/youtube.force-ssl",
          "https://www.googleapis.com/auth/youtube.upload",
          "https://www.googleapis.com/auth/youtubepartner-channel-audit",
          "https://www.googleapis.com/auth/yt-analytics-monetary.readonly",
          "https://www.googleapis.com/auth/yt-analytics.readonly"
        );
        break;
      case "facebook":
        provider.addScope(
          "ads_management",
          "ads_read",
          "attribution_read",
          "business_management",
          "catalog_management",
          "email",
          "gaming_user_locale",
          "groups_access_member_info",
          "instagram_basic",
          "instagram_content_publish",
          "instagram_manage_comments",
          "instagram_manage_insights",
          "leads_retrieval",
          "pages_events",
          "pages_manage_ads",
          "pages_manage_cta",
          "pages_manage_instant_articles",
          "pages_manage_engagement",
          "pages_manage_metadata",
          "pages_manage_posts",
          "pages_messaging",
          "pages_read_engagement",
          "pages_read_user_content",
          "pages_show_list",
          "pages_user_gender",
          "pages_user_locale",
          "pages_user_timezone",
          "public_profile",
          "publish_to_groups",
          "publish_video",
          "read_insights",
          "research_apis",
          "user_age_range",
          "user_birthday",
          "user_friends",
          "user_gender",
          "user_hometown",
          "user_likes",
          "user_link",
          "user_location",
          "user_messenger_contact",
          "user_photos",
          "user_posts",
          "user_videos"
        );
        break;
      case "github":
        provider.addScope(
          "repo",
          "repo:status",
          "repo_deployment",
          "public_repo",
          "repo:invite",
          "security_events",
          "admin:repo_hook",
          "write:repo_hook",
          "read:repo_hook",
          "admin:org",
          "write:org",
          "read:org",
          "admin:public_key",
          "write:public_key",
          "read:public_key",
          "admin:org_hook",
          "gist",
          "notifications",
          "user",
          "read:user",
          "user:email",
          "user:follow",
          "delete_repo",
          "write:discussion",
          "read:discussion",
          "write:packages",
          "read:packages",
          "delete:packages",
          "admin:gpg_key",
          "write:gpg_key",
          "read:gpg_key",
          "codespace",
          "workflow"
        );
        break;
      default:
        break;
    }
    signInWithPopup(auth, provider)
      .then((re) => {
        localStorage.setItem("tokenID", re._tokenResponse.idToken)
        httpRequest(
          process.env.REACT_APP_SIGN_USER_PROVIDER,
          {
            user: `${re.user}`,
          },
          {
            tokenid: `Bearer ${re._tokenResponse.idToken}`,
          },
          "post"
        )
          .then((res) => {
            navigate("/home", {state: {email: re.user.email}});
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Flex>
      <Box mr={2}>
        <Button
          h={[65, 75]}
          colorScheme="facebook"
          borderRadius="100px"
          p={["5px", "15px"]}
          onClick={() => signInWithOAuth(facebookProvider, "facebook")}
        >
          <FaFacebook size={50}/>
        </Button>
      </Box>
      <Box mr={2}>
        <Button
          h={[65, 75]}
          borderRadius="100px"
          variant={"outline"}
          p={["5px", "15px"]}
          onClick={() => signInWithOAuth(googleProvider, "google")}
        >
          <FcGoogle size={50}/>
        </Button>
      </Box>
      <Box>
        <Button
          h={[65, 75]}
          p={["5px", "15px"]}
          borderRadius="100px"
          bg="#1C2128"
          color="#FFFF"
          _hover={{bg: "#2D333B"}}
          onClick={() => signInWithOAuth(githubProvider, "github")}
        >
          <BsGithub size={50}/>
        </Button>
      </Box>
    </Flex>
  );
};

export default SocialsButton;
