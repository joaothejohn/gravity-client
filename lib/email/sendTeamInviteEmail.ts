import { Invitation, Team } from '@prisma/client';
import { sendEmail } from './sendEmail';
import { TeamInviteEmail } from '@/components/emailTemplates';
import { render } from '@react-email/components';
import env from '../env';
import { deleteInvitation } from 'models/invitation';
import { sendEvent } from '../svix';

export const sendTeamInviteEmail = async (
  team: Team,
  invitation: Invitation
) => {
  try {
    const invitationLink = `${env.appUrl}/invitations/${invitation.token}`;
    const html = render(TeamInviteEmail({ invitationLink, team }));

    await sendEmail({
      to: invitation.email,
      subject: 'Team Invitation',
      html,
    });
  } catch (error: any) {
    await deleteInvitation({ token: invitation.token });

    await sendEvent(invitation.teamId, 'invitation.email.failed', { ...invitation, error });
    
    throw new Error('Could not send team invitation email.');
  }
};
